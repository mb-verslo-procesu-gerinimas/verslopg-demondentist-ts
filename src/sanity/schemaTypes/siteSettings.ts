import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Svetainės išvaizda',
  type: 'document',
  // Hides Studio's form heading, which reads "Untitled" on these fixed pages.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'palette',
      title: 'Spalvų paletė',
      description:
        'Keičia fono, viršutinės ir apatinės juostos, teksto ir nuorodų spalvas visoje svetainėje. Nauja paletė pasirodo per minutę po paskelbimo.',
      type: 'string',
      // Each value other than "default" needs a [data-palette] block in tailwind.css.
      options: {
        list: [
          { title: 'Numatytoji', value: 'default' },
          { title: 'Cappuccino', value: 'cappuccino' },
          { title: 'Beach', value: 'beach' },
          { title: 'Beautiful Blues', value: 'blues' },
          { title: 'Skin Tones', value: 'skin' },
          { title: 'Sage Green', value: 'sage' },
          { title: 'Soft Pastel', value: 'pastel' },
          { title: 'Matcha Latte', value: 'matcha' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'palette' },
    prepare: () => ({ title: 'Svetainės išvaizda' }),
  },
})
