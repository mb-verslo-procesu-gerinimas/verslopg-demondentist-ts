import { postType } from '@/sanity/schemaTypes/post'
import { reelType } from '@/sanity/schemaTypes/reel'
import { veiklaType } from '@/sanity/schemaTypes/veikla'
import { aboutMeType } from '@/sanity/schemaTypes/aboutMe'
import { contactPageType } from '@/sanity/schemaTypes/contactPage'
import { pageIntrosType } from '@/sanity/schemaTypes/pageIntros'
import { siteSettingsType } from '@/sanity/schemaTypes/siteSettings'

export const schemaTypes = [
  aboutMeType,
  contactPageType,
  pageIntrosType,
  siteSettingsType,
  postType,
  reelType,
  veiklaType,
]
