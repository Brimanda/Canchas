
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!)

export default async function handler(req: { method: string; body: { name: any; email: any; message: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string }): void; new(): any }; end: { (arg0: string): void; new(): any } }; setHeader: (arg0: string, arg1: string[]) => void }) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    try {
      await resend.emails.send({
        from: email, 
        to: 'br.miranda@duocuc.cl', 
        subject: `Mensaje de contacto de ${name}`,
        html: `
          <p>Nombre: ${name}</p>
          <p>Email: ${email}</p>
          <p>Mensaje:</p>
          <p>${message}</p>
        `,
      })
      res.status(200).json({ message: 'Email enviado exitosamente.' })
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      res.status(500).json({ error: 'Ocurrió un error al enviar el correo.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Método ${req.method} no permitido`)
  }
}
