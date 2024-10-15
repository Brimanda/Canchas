import * as React from 'react';

interface EmailTemplateProps {
  userFullName: string;  
  nombre: string;
  fecha: string;
  lugar: string;
  nombreCancha: string;
  capacidad: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ 
  userFullName, 
  fecha, 
  lugar, 
  nombreCancha, 
  capacidad 
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', lineHeight: '1.6' }}>
    <h3>¡Hola {userFullName}!</h3>
    <br />
    <p><strong>Tu reserva ha sido confirmada exitosamente.</strong></p>
    <p>A continuación, te proporcionamos los detalles de tu reserva:</p>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li><strong>Fecha:</strong> {fecha}</li>
      <li><strong>Lugar:</strong> {lugar}</li>
      <li><strong>Nombre de la Cancha:</strong> {nombreCancha}</li>
      <li><strong>Capacidad:</strong> {capacidad}</li>
    </ul>
    <p>Si tienes alguna duda, no dudes en contactar con nuestro equipo de soporte.</p>
    <br />
    <a href="/pedidos" style={{ 
      display: 'inline-block', 
      padding: '10px 20px', 
      backgroundColor: '#4CAF50', 
      color: '#ffffff', 
      textDecoration: 'none', 
      borderRadius: '5px',
      fontWeight: 'bold'
    }}>
      Ir a las reservas
    </a>
  </div>
);
