import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Kontaktai',
  type: 'document',
  // Hides Studio's form heading, which reads "Untitled" on these fixed pages.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Antraštė',
      type: 'string',
      initialValue: 'Kontaktai',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram nuoroda',
      description: 'Rodoma ir svetainės poraštėje.',
      type: 'url',
      initialValue: 'https://www.instagram.com/demone.dantiste',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramLabel',
      title: 'Instagram tekstas',
      type: 'string',
      initialValue: 'demone.dantiste',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook nuoroda',
      description: 'Rodoma ir svetainės poraštėje.',
      type: 'url',
      initialValue: 'https://www.facebook.com/demonedantiste/',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'facebookLabel',
      title: 'Facebook tekstas',
      type: 'string',
      initialValue: 'demonedantiste',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'El. paštas',
      description: 'Rodomas ir svetainės poraštėje.',
      type: 'string',
      initialValue: 'demonedantiste@gmail.com',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'image',
      title: 'Nuotrauka',
      description: 'Jei nepasirinkta, rodoma numatytoji nuotrauka.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: () => ({ title: 'Kontaktai' }),
  },
})
