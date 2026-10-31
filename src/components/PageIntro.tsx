import Image from 'next/image'

import avatarImage from '@/images/raminta_avatar.jpg'
import { urlFor } from '@/sanity/lib/image'
import { getPageIntros, type PageIntros } from '@/sanity/lib/queries'

const defaultIntros = {
  veiklaIntro:
    'Čia rasite informaciją apie mano veiklas, pasiekimus ir projektus, susijusius su odontologija ir burnos sveikata.',
  articlesIntro:
    'Čia rasite mano straipsnius, įžvalgas ir patarimus apie dantų priežiūrą, profilaktiką ir vaikų odontologiją.',
  reelsIntro: 'Čia rasite mano naujausius vaizdo įrašus iš Instagram.',
}

export async function PageIntro({
  field,
}: {
  field: Exclude<keyof PageIntros, 'avatar'>
}) {
  const intros = await getPageIntros()

  return (
    <div className="flex items-center gap-4">
      <Image
        src={
          intros?.avatar
            ? urlFor(intros.avatar).width(96).height(96).url()
            : avatarImage
        }
        width={96}
        height={96}
        alt=""
        className="h-12 w-12 flex-none rounded-full object-cover ring-1 ring-line"
      />
      <p className="w-fit max-w-2xl rounded-2xl bg-surface px-4 py-3 text-base text-body ring-1 ring-line">
        {intros?.[field] ?? defaultIntros[field]}
      </p>
    </div>
  )
}
