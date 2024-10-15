import { EmailTemplate } from '@/components/email-template-reserva';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, fecha, lugar, nombreCancha, capacidad } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],  
      subject: 'Confirmación Reserva',
      react: EmailTemplate({ 
        nombre: name, 
        fecha, 
        lugar, 
        nombreCancha, 
        capacidad 
      }), 
    });

    if (error) {
      console.log("Error al enviar el correo:", error);  
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    console.log("Correo enviado exitosamente:", data);  
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("Error en el bloque catch:", error);  
    return new Response(JSON.stringify({ error: 'Error enviando el correo' }), { status: 500 });
  }
}
