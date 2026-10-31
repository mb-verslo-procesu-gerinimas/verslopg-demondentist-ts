import { type PortableTextBlock } from '@portabletext/react'
import { type Image } from 'sanity'
import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'

export type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: Image
  publishedAt: string
  body?: PortableTextBlock[]
}

const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, mainImage, publishedAt
}`

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, mainImage, publishedAt, body
}`

export type Reel = {
  _id: string
  url: string
  publishedAt: string
}

const reelsQuery = groq`*[_type == "reel" && defined(url)] | order(publishedAt desc){
  _id, url, publishedAt
}`

export async function getAllReels(): Promise<Reel[]> {
  try {
    return await client.fetch(reelsQuery)
  } catch {
    return []
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    return await client.fetch(postsQuery)
  } catch {
    // Sanity project isn't configured yet, or the request failed; show an empty list instead of crashing.
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(postBySlugQuery, { slug })
  } catch {
    return null
  }
}

export type Veikla = {
  _id: string
  title: string
  description?: string
  icon?: Image
  link?: string
  order: number
}

export type AboutMeContent = {
  title?: string
  role?: string
  license?: string
  body?: PortableTextBlock[]
  image?: Image
}

const veiklaQuery = groq`*[_type == "veikla"] | order(order asc, _createdAt asc){
  _id, title, description, icon, link, order
}`

// The pre-singleton document has a random _id, so match on type: it keeps
// showing until the "aboutMe" singleton is published, which is then the newest.
const aboutMeContentQuery = groq`*[_type == "aboutMe"] | order(_updatedAt desc)[0]{
  title, role, license, body, image
}`

export async function getAllVeikla(): Promise<Veikla[]> {
  try {
    return await client.fetch(veiklaQuery)
  } catch {
    return []
  }
}

export async function getAboutMeContent(): Promise<AboutMeContent | null> {
  try {
    return await client.fetch(aboutMeContentQuery)
  } catch {
    return null
  }
}

const accentQuery = groq`*[_id == "siteSettings"][0].accent`

export async function getAccent(): Promise<string | undefined> {
  try {
    return (await client.fetch(accentQuery)) ?? undefined
  } catch {
    return undefined
  }
}

export type PageIntros = {
  avatar?: Image
  veiklaIntro?: string
  articlesIntro?: string
  reelsIntro?: string
}

const pageIntrosQuery = groq`*[_id == "pageIntros"][0]{
  avatar, veiklaIntro, articlesIntro, reelsIntro
}`

export async function getPageIntros(): Promise<PageIntros | null> {
  try {
    return await client.fetch(pageIntrosQuery)
  } catch {
    return null
  }
}

export type HomePage = {
  title?: string
  body?: PortableTextBlock[]
  image?: Image
}

const homePageQuery = groq`*[_id == "homePage"][0]{
  title, body, image
}`

export async function getHomePage(): Promise<HomePage | null> {
  try {
    return await client.fetch(homePageQuery)
  } catch {
    return null
  }
}

export type ContactPage = {
  title: string
  instagramUrl: string
  instagramLabel: string
  facebookUrl: string
  facebookLabel: string
  email: string
  image?: Image
}

const contactPageQuery = groq`*[_id == "contactPage"][0]{
  title, instagramUrl, instagramLabel, facebookUrl, facebookLabel, email, image
}`

export async function getContactPage(): Promise<ContactPage> {
  let page: Partial<ContactPage> | null = null
  try {
    page = await client.fetch(contactPageQuery)
  } catch {
    // Fall through to the defaults below; the footer renders on every page.
  }

  return {
    title: page?.title ?? 'Kontaktai',
    instagramUrl:
      page?.instagramUrl ?? 'https://www.instagram.com/demone.dantiste',
    instagramLabel: page?.instagramLabel ?? 'demone.dantiste',
    facebookUrl:
      page?.facebookUrl ?? 'https://www.facebook.com/demonedantiste/',
    facebookLabel: page?.facebookLabel ?? 'demonedantiste',
    email: page?.email ?? 'demonedantiste@gmail.com',
    image: page?.image ?? undefined,
  }
}
