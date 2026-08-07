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
  _id: string
  body?: PortableTextBlock[]
}

const veiklaQuery = groq`*[_type == "veikla"] | order(order asc, _createdAt asc){
  _id, title, description, icon, link, order
}`

const aboutMeContentQuery = groq`*[_type == "aboutMe"] | order(_updatedAt desc)[0]{
  _id, body
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
