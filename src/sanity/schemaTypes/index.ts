import { postType } from '@/sanity/schemaTypes/post'
import { reelType } from '@/sanity/schemaTypes/reel'
import { veiklaType } from '@/sanity/schemaTypes/veikla'
import { aboutMeType } from '@/sanity/schemaTypes/aboutMe'
import { contactPageType } from '@/sanity/schemaTypes/contactPage'

export const schemaTypes = [
  aboutMeType,
  contactPageType,
  postType,
  reelType,
  veiklaType,
]
