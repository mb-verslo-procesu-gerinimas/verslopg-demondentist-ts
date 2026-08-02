import { defineField, defineType } from 'sanity'

export const reelType = defineType({
  name: 'reel',
  title: 'Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'url',
      title: 'Instagram nuoroda',
      description: 'pvz. https://www.instagram.com/reel/SHORTCODE/',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Paskelbimo data',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'url' },
  },
})
