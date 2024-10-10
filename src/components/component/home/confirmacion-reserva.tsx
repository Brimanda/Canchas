'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Calendar, Users, DollarSign } from "lucide-react";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Crea una instancia del cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function ConfirmacionReservaComponent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const nombre = searchParams.get('nombre') || 'No especificado';
  const tipo = searchParams.get('tipo') || 'No especificado';
  const canchaId = searchParams.get('cancha_id');
  const userId = searchParams.get('user_id');
  const fecha = searchParams.get('fecha') || new Date().toISOString(); 
  const precio = searchParams.get('precio') || 'No especificado';

  const obtenerHoraActual = () => {
    return new Date(); 
  };

  const confirmarReserva = async () => {
    setLoading(true);
    setError(null);
  
    console.log("Cancha ID:", canchaId);
    console.log("User ID:", userId);
  
    if (!canchaId || !userId) {
      setError('Faltan algunos datos necesarios para confirmar la reserva.');
      setLoading(false);
      return;
    }
  
    const fechaReserva = new Date(fecha); 
    const horaReserva = obtenerHoraActual(); 
  
    console.log("Fecha Reserva:", fechaReserva);
    console.log("Hora Reserva:", horaReserva);
  
    const { data, error } = await supabase.from('reservas').insert([{
        user_id: userId,                
        cancha_id: parseInt(canchaId),  
        fecha: fechaReserva,            
        estado: 'pendiente',            
    }]);
  
    if (error) {
      console.error('Error al insertar la reserva:', error);
      setError('Ocurrió un error al confirmar la reserva. Por favor, inténtalo de nuevo.');
    } else {
      console.log('Reserva insertada:', data);
      setSuccess(true); // Mostrar mensaje de éxito
    }
  
    setLoading(false);
  };
  
  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Reserva Confirmada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">Tu reserva ha sido confirmada exitosamente.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Confirmación de Reserva</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          <div className="bg-green-100 border-l-4 border-green-500 p-4 flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            <p className="text-green-700">Tu reserva está casi lista. Por favor, revisa los detalles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500" />
              <div>
                <p className="font-semibold">Fecha</p>
                <p className="text-sm text-gray-600">{new Date(fecha).toLocaleDateString()}</p> 
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" />
              <div>
                <p className="font-semibold">Hora</p>
                <p className="text-sm text-gray-600">{new Date(fecha).toLocaleTimeString()}</p> 
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-blue-500" />
              <div>
                <p className="font-semibold">Nombre de la cancha</p>
                <p className="text-sm text-gray-600">{nombre}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="text-blue-500" />
              <div>
                <p className="font-semibold">Precio</p>
                <p className="text-sm text-gray-600">${precio}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={confirmarReserva} disabled={loading} className="w-full">
            {loading ? "Confirmando..." : "Confirmar Reserva"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
