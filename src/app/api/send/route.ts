import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!); // Usa la clave API del lado del servidor

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    
    return new Response(JSON.stringify({ error: 'Error al enviar el correo' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
