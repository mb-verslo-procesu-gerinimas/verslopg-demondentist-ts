import { defineField, defineType } from 'sanity'

export const veiklaType = defineType({
  name: 'veikla',
  title: 'Veikla',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pavadinimas',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Aprašymas',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'icon',
      title: 'Paveikslėlis / ikonėlė',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Nuoroda (neprivaloma)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Rikiavimo tvarka',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
  },
})
