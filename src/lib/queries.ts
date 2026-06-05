export const getAllPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  body,
  publishedAt,
  excerpt,
  tags
}`

export const getPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  body,
  publishedAt,
  excerpt,
  tags
}`
