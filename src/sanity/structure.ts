import { type StructureResolver } from 'sanity/structure'

// Document types that exist exactly once; their _id equals their type name.
export const singletonTypes = ['aboutMe', 'contactPage', 'siteSettings']

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
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.includes(item.getId() ?? ''),
      ),
    ])
