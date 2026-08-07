import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutMeType = defineType({
  name: 'aboutMe',
  title: 'Apie mane turinys',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas',
      type: 'string',
      initialValue: 'Apie mane',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Tekstas po licencijos eilute',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
