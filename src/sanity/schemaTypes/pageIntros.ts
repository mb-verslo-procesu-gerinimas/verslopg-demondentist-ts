import { defineField, defineType } from 'sanity'

export const pageIntrosType = defineType({
  name: 'pageIntros',
  title: 'Puslapių įžangos',
  type: 'document',
  // Hides Studio's form heading, which reads "Untitled" on these fixed pages.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'avatar',
      title: 'Nuotrauka',
      description:
        'Rodoma šalia teksto visuose trijuose puslapiuose. Jei nepasirinkta, rodoma numatytoji nuotrauka.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'veiklaIntro',
      title: 'Mano veikla',
      type: 'text',
      rows: 3,
      initialValue:
        'Čia rasite informaciją apie mano veiklas, pasiekimus ir projektus, susijusius su odontologija ir burnos sveikata.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'articlesIntro',
      title: 'Straipsniai',
      type: 'text',
      rows: 3,
      initialValue:
        'Čia rasite mano straipsnius, įžvalgas ir patarimus apie dantų priežiūrą, profilaktiką ir vaikų odontologiją.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reelsIntro',
      title: 'Reels',
      type: 'text',
      rows: 3,
      initialValue: 'Čia rasite mano naujausius vaizdo įrašus iš Instagram.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'veiklaIntro' },
    prepare: () => ({ title: 'Puslapių įžangos' }),
  },
})
