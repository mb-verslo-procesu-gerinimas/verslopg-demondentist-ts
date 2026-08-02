import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'El. paštas yra privalomas' },
        { status: 400 },
      )
    }

    const response = await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          groups: process.env.MAILERLITE_GROUP_ID
            ? [process.env.MAILERLITE_GROUP_ID]
            : [],
        }),
      },
    )

    if (!response.ok) {
      throw new Error('Nepavyko susisiekti su MailerLite')
    }

    return NextResponse.json({ message: 'Sėkmingai!' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Įvyko klaida' }, { status: 500 })
  }
}
