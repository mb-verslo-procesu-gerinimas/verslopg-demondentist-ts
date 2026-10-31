import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutMeType = defineType({
  name: 'aboutMe',
  title: 'Apie mane',
  type: 'document',
  // Hides Studio's form heading, which reads "Untitled" on these fixed pages.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Antraštė',
      type: 'string',
      initialValue: 'Apie mane',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Pareigos',
      type: 'string',
      initialValue: 'Bendrosios praktikos gydytoja odontologė',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'license',
      title: 'Licencijos eilutė',
      type: 'string',
      initialValue: 'Licencijos Nr. OPL-04229',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Tekstas po licencijos eilute',
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
              text: 'Geros burnos sveikatos priežiūros rodiklis yra ne didelis užplombuotų dantų skaičius, o atvirkščiai – kuo vyresnis žmogaus amžius su pirmaisiais dantų pažeidimais bei kuo mažesnis gydytų dantų skaičius. Savo darbe visuomet akcentuoju galimybę išvengti dantų pažeidimų, mokydama pacientus asmeninės burnos higienos ir paaiškindama, kodėl genda žmogaus dantys. Su pacientais (tiek suaugusiais, tiek vaikais) atrandu individualų bendravimo būdą, gydymą atlieku taip, kad žmogus jaustųsi maksimaliai komfortiškai (paciento užsnūdimas kėdėje – geras to įvertinimas). Anksčiau vengdavę odontologų, arba turėję baimių (pavyzdžiui, vaikai) pacientai po procedūrų į šiuolaikinį gydymą pažvelgia kitomis – didesnio pasitikėjimo – akimis, dažniausiai iš kabineto išeina šypsodamiesi. Manimi pasitiki visi pacientų šeimos nariai – tiek vaikai, tiek tėvai ar seneliai.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'services',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'servicesText',
              marks: [],
              text: 'Atlieku dantų (nuolatinių ir pieninių) ėduonies gydymą, pieninių dantų šalinimą, mokuosi ir praktikuoju estetinį priekinių dantų plombavimą. Tobulėju kursuose, konferencijose, seminaruose.',
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
    prepare: () => ({ title: 'Apie mane' }),
  },
})
