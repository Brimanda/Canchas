'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/app/lib/supabase';

interface OpinionesCard {
  courtName: string;
  courtImage: string;
  courtLocation: string;
  clientName: string;
  comment: string;
  rating: number;
}

function OpinionesUsuariosCard({
  courtName,
  courtImage,
  courtLocation,
  clientName,
  comment,
  rating,
}: OpinionesCard) {
  return (
    <Card className="max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={courtImage || "/placeholder.svg"}
          alt={courtName}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-xl font-semibold text-white">{courtName}</h2>
          <div className="flex items-center text-white/80 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{courtLocation}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-medium">{clientName}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Reseña Verificada
          </Badge>
        </div>
        <p className="text-gray-600 italic">"{comment}"</p>
      </CardContent>
    </Card>
  );
}

export default function OpinionesCard() {
  const [reviews, setReviews] = useState<OpinionesCard[]>([]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase.rpc('fetch_reviews');

      // Comprobamos si hay un error
      if (error) {
        console.error('Error fetching reviews:', error);
        return; // Salimos de la función si hay error
      }

      // Aseguramos que `data` no sea null o undefined
      if (!data || data.length === 0) {
        console.log('No se encontraron reseñas.');
        return; // Salimos de la función si no hay datos
      }

      // Mapeamos los datos recibidos
      const formattedData = data.map((reserva: any) => ({
        courtName: reserva.nombre_cancha || 'Nombre de cancha no disponible',
        courtImage: reserva.imagen || "/placeholder.svg",
        courtLocation: reserva.ubicacion || 'Ubicación no disponible',
        clientName: reserva.nombre || 'Usuario desconocido',
        comment: reserva.comentario || 'Comentario no disponible',
        rating: reserva.puntuacion || 0,
      }));

      setReviews(formattedData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Reseñas de Canchas Deportivas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <OpinionesUsuariosCard key={index} {...review} />
          ))
        ) : (
          <p>No hay reseñas disponibles.</p>
        )}
      </div>
    </div>
  );
}
