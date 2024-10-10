// app/api/sendEmail/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  try {
    const data = await resend.emails.send({
      from: email, 
      to: 'br.miranda@duocuc.cl', 
      subject: `Mensaje de contacto de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error al enviar el correo:', error)
    return new Response(JSON.stringify({ error: 'Error al enviar el correo' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
