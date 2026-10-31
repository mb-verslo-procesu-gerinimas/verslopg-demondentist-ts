import { postType } from '@/sanity/schemaTypes/post'
import { reelType } from '@/sanity/schemaTypes/reel'
import { veiklaType } from '@/sanity/schemaTypes/veikla'
import { aboutMeType } from '@/sanity/schemaTypes/aboutMe'
import { homePageType } from '@/sanity/schemaTypes/homePage'
import { contactPageType } from '@/sanity/schemaTypes/contactPage'

export const schemaTypes = [
  homePageType,
  aboutMeType,
  contactPageType,
  postType,
  reelType,
  veiklaType,
]
