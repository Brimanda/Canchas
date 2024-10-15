import * as React from 'react';

interface EmailTemplateProps {
  nombre: string;
  fecha: string;
  lugar: string;
  nombreCancha: string;
  capacidad: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ nombre, fecha, lugar, nombreCancha, capacidad }) => (
  <div>
    <h3>¡Hola {nombre}!</h3>
    <br />
    <p><strong>Tu reserva ha sido confirmada con el sistema</strong></p>
    <p>A continuación te entregaremos los datos correspondientes a la reserva:</p>
    <p>Fecha: {fecha}</p>
    <p>Lugar: {lugar}</p>
    <p>Nombre de la Cancha: {nombreCancha}</p>
    <p>Capacidad: {capacidad}</p>
    <p>Si tienes alguna duda, no dudes en contactar con nuestro soporte.</p>
  </div>
);
