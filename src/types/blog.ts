export type Post = {
  _id: string
  title: string
  slug: { current: string }
  body: any
  publishedAt: string
  excerpt?: string
  tags?: string[]
}
