import { type StructureResolver } from 'sanity/structure'

// Document types that exist exactly once; their _id equals their type name.
export const singletonTypes = [
  'aboutMe',
  'contactPage',
  'pageIntros',
  'siteSettings',
]

// Plural sidebar labels; schema titles stay singular for "New ..." buttons.
const listTitles: Record<string, string> = {
  post: 'Straipsniai',
  reel: 'Reels',
  veikla: 'Veiklos',
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Turinys')
    .items([
      ...singletonTypes.map((type) => {
        const title = S.context.schema.get(type)?.title ?? type

        return S.listItem()
          .id(type)
          .title(title)
          .child(S.document().schemaType(type).documentId(type).title(title))
      }),
      S.divider(),
      ...S.documentTypeListItems()
        .filter((item) => !singletonTypes.includes(item.getId() ?? ''))
        .map((item) => {
          const type = item.getId() ?? ''
          const title = listTitles[type]

          return title
            ? item.title(title).child(S.documentTypeList(type).title(title))
            : item
        }),
    ])
