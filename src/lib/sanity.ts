import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '2hf9u675',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
