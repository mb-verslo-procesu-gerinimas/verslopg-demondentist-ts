import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Svetainės išvaizda',
  type: 'document',
  // Hides Studio's form heading, which reads "Untitled" on these fixed pages.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'accent',
      title: 'Spalvų paletė',
      description:
        'Nuorodų, paryškinimų ir mygtukų spalva. Nauja spalva svetainėje pasirodo per minutę po paskelbimo.',
      type: 'string',
      // Each value needs a matching [data-accent] block in tailwind.css.
      options: {
        list: [
          { title: 'Žalsvai mėlyna', value: 'teal' },
          { title: 'Rožinė', value: 'rose' },
          { title: 'Mėlyna', value: 'blue' },
          { title: 'Violetinė', value: 'violet' },
        ],
        layout: 'radio',
      },
      initialValue: 'teal',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'accent' },
    prepare: () => ({ title: 'Svetainės išvaizda' }),
  },
})
