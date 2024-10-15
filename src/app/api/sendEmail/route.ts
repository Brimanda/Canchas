import { EmailTemplate } from '@/components/email-template-reserva';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, fecha, lugar, nombreCancha, capacidad } = await request.json();

  try {
    const response = await resend.emails.send({
      from: 'SportRent <sportrent@turismodelvallespa.com>',
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

    console.log("Respuesta del servidor de Resend:", response);

    if (response.error) {
      console.log("Error al enviar el correo:", response.error);
      return new Response(JSON.stringify({ error: response.error }), { status: 500 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
    
  } catch (error) {
    console.log("Error inesperado al enviar el correo:", error);
    return new Response(JSON.stringify({ error: 'Error inesperado al enviar el correo' }), { status: 500 });
  }
}
