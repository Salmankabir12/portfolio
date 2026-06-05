import type { APIRoute } from 'astro'
import { Resend } from 'resend'

export const POST: APIRoute = async ({ request, locals }) => {
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

    // @ts-ignore Cloudflare env binding
    const env = locals.runtime.env
    const db = env.DB

    await db
      .prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)')
      .bind(name, email, message)
      .run()

    // Send emails (non-blocking for form success)
    try {
      const resend = new Resend(env.RESEND_API_KEY)
      const timestamp = new Date().toISOString()

      // Email 1: notify owner
      await resend.emails.send({
        from: env.FROM_EMAIL,
        to: env.CONTACT_EMAIL,
        subject: `New contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n\nTime: ${timestamp}`,
      })

      // Email 2: confirmation to visitor
      await resend.emails.send({
        from: env.FROM_EMAIL,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        text: `Hi ${name},\n\nThanks for your message. I received it and will get back to you soon.\n\nBest,\nSalman kabir`,
      })
    } catch (emailErr) {
      // Swallow email errors so the form still succeeds
      console.error('Email send failed', emailErr)
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
