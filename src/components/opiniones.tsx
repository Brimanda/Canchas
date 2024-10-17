'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';

interface OpinionesCard {
  courtName: string;
  courtImage: string;
  courtLocation: string;
  clientName: string;
  clientAvatar: string;
  comment: string;
  rating: number;
}

export function OpinionesUsuariosCard({
  courtName,
  courtImage,
  courtLocation,
  clientName,
  clientAvatar,
  comment,
  rating,
}: OpinionesCard) {
  return (
    <Card className="max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={courtImage}
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
            <Avatar>
              <AvatarImage src={clientAvatar} alt={clientName} />
              <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{clientName}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
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

// Ejemplo de uso con datos de muestra
export function CourtReviews() {
  const reviews = [
    {
      courtName: "Cancha Central Fútbol",
      courtImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/soccer-field-gf250baf69_1280-4Hhp3AXeA9QpZOQzXSxVJsSoLwNxXa.jpg",
      courtLocation: "Buenos Aires, Argentina",
      clientName: "Carlos Rodríguez",
      clientAvatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar1-K6IcTrUwRwVjgADJLLQELZZEXZBHxQ.jpg",
      comment: "Excelente cancha, el césped está en perfectas condiciones. Ideal para partidos amistosos o torneos locales.",
      rating: 5,
    },
    {
      courtName: "Complejo Tenis Las Palmas",
      courtImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tennis-court-g8e7f7645f_1280-hhIQPBBBBVXZXBxwxLLLLLLLLLLLLL.jpg",
      courtLocation: "Madrid, España",
      clientName: "Ana Martínez",
      clientAvatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar2-hhIQPBBBBVXZXBxwxLLLLLLLLLLLLL.jpg",
      comment: "Las canchas de tenis están muy bien mantenidas. El personal es amable y las instalaciones son de primera.",
      rating: 4,
    },
    {
      courtName: "Cancha de Básquet Riverside",
      courtImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/basketball-court-g5b7e7fe24_1280-hhIQPBBBBVXZXBxwxLLLLLLLLLLLLL.jpg",
      courtLocation: "New York, USA",
      clientName: "Michael Johnson",
      clientAvatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar3-hhIQPBBBBVXZXBxwxLLLLLLLLLLLLL.jpg",
      comment: "Great court with a nice view of the city. The surface is well-maintained and perfect for pickup games.",
      rating: 5,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Reseñas de Canchas Deportivas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <OpinionesUsuariosCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
}
