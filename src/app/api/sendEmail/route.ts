import { EmailTemplate } from '@/components/email-template-reserva';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, fecha, lugar, nombreCancha, capacidad } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sportrent <info@sportrent.com>',
      to: [email],  
      subject: 'Confirmación de Reserva',
      react: EmailTemplate({ 
        nombre: name, 
        fecha, 
        lugar, 
        nombreCancha, 
        capacidad 
      }), 
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error enviando el correo' }), { status: 500 });
  }
}
