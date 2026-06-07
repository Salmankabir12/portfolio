import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || ''

    let data: any = {}
    if (contentType.includes('application/json')) {
      data = await request.json()
    } else {
      const form = await request.formData()
      data = {
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
      }
    }

    const { name, email, message } = data

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    const db = env.DB

    if (!db) return new Response(JSON.stringify({ error: 'DB binding missing' }), { status: 500 })

    const result = await db
      .prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)')
      .bind(name, email, message)
      .run()

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'DB insert failed', detail: result.error }), { status: 500 })
    }

    const timestamp = new Date().toISOString()
    const from = env.FROM_EMAIL || 'onboarding@resend.dev'

    try {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: env.CONTACT_EMAIL,
          subject: `New contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nTime: ${timestamp}`,
        }),
      })
      if (!resp.ok) {
        const body = await resp.text()
        console.error('Resend error:', resp.status, body)
      }
    } catch (e) {
      console.error('Email fetch error:', e)
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}
