import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Pradinis puslapis',
  type: 'document',
  // Hides Studio's form heading, which reads "Untitled" on these fixed pages.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Antraštė',
      type: 'string',
      initialValue: 'Demonė Dantistė',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Tekstas po antrašte',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      initialValue: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'introText',
              marks: [],
              text: 'Dantų gydytoja, turinti didžiulį susidomėjimą profilaktika, visuomeniniu dantų sveikatos švietimu bei dantų sveikatos statistikos gerinimu Lietuvoje, ypač vaikų odontologijoje.',
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
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
    prepare: () => ({ title: 'Pradinis puslapis' }),
  },
})
