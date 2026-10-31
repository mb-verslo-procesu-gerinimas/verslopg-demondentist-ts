import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'slug',
      title: 'Nuoroda (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Trumpas aprašymas',
      description: 'Rodomas kortelėje veiklų sąraše.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    // Stored as "icon" so images uploaded before subpages existed carry over.
    defineField({
      name: 'icon',
      title: 'Nuotrauka',
      description: 'Rodoma kortelėje ir veiklos puslapyje.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Turinys',
      description: 'Jei tuščia, puslapyje rodomas trumpas aprašymas.',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'link',
      title: 'Nuoroda puslapio pabaigoje (neprivaloma)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
  },
})
