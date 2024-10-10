'use client';

import { useSearchParams } from 'next/navigation'; // Importa useSearchParams
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Calendar, Users, DollarSign } from "lucide-react";

export function ConfirmacionReservaComponent() {
  const searchParams = useSearchParams();

  const nombre = searchParams.get('nombre') || 'No especificado';
  const tipo = searchParams.get('tipo') || 'No especificado';
  const capacidad = searchParams.get('capacidad') || 'No especificada';
  const ubicacion = searchParams.get('ubicacion') || 'No especificada';
  const precio = searchParams.get('precio') || 'No especificado';
  const disponibilidad = searchParams.get('disponibilidad') === 'true' ? 'Disponible' : 'No disponible';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Confirmación de Reserva</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-100 border-l-4 border-green-500 p-4 flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            <p className="text-green-700">Tu reserva está casi lista. Por favor, revisa los detalles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500" />
              <div>
                <p className="font-semibold">Fecha</p>
                <p className="text-sm text-gray-600">15 de Octubre, 2023</p> 
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" />
              <div>
                <p className="font-semibold">Hora</p>
                <p className="text-sm text-gray-600">18:00 - 19:00</p> 
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-blue-500" />
              <div>
                <p className="font-semibold">Cancha</p>
                <p className="text-sm text-gray-600">{`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} - ${nombre}`}</p>
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

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Proceso de confirmación:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Verifica que todos los detalles de la reserva sean correctos.</li>
              <li>Asegúrate de que la fecha y hora seleccionadas te convengan.</li>
              <li>Revisa el precio total de la reserva.</li>
              <li>Lee y acepta los términos y condiciones de uso de la cancha.</li>
              <li>Haz clic en el botón "Confirmar Reserva" para finalizar el proceso.</li>
            </ol>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-700">
              Nota: Una vez confirmada la reserva, aplicarán las políticas de cancelación y reembolso.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-lg py-6" size="lg">
            Confirmar Reserva
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
