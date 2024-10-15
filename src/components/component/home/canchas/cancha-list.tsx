'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/component/auth/AuthProvider"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { CalendarIcon, MapPinIcon, UsersIcon, Star } from "lucide-react";
import Image from "next/image";
import { getCanchas } from "@/app/lib/canchas";
import { insertarPuntuacion, getPuntuacionesPorCancha } from "@/app/lib/puntuaciones"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiposDeporte = ["futbol", "tenis", "basquet", "voley"];

export function CanchasDeportivas() {
  const { session, isLoading } = useAuth();
  const [canchas, setCanchas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filtrosDeporte, setFiltrosDeporte] = useState<string[]>([]);
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("todas");
  const [filtroPrecioMax, setFiltroPrecioMax] = useState(60);
  const [filtroCapacidadMin, setFiltroCapacidadMin] = useState(0);
  const [ratings, setRatings] = useState<{[key: number]: {rating: number, total: number}}>({});
  const router = useRouter();

  const toggleFiltroDeporte = (deporte: string) => {
    setFiltrosDeporte(prev =>
      prev.includes(deporte)
        ? prev.filter(d => d !== deporte)
        : [...prev, deporte]
    );
  };

  const canchasFiltradas = canchas.filter((cancha) => {
    return (
      (filtrosDeporte.length === 0 || filtrosDeporte.includes(cancha.tipo)) &&
      (filtroDisponibilidad === "todas" ||
       (filtroDisponibilidad === "disponibles" && cancha.disponible) ||
       (filtroDisponibilidad === "no disponibles" && !cancha.disponible)) &&
      cancha.precio <= filtroPrecioMax &&
      cancha.capacidad >= filtroCapacidadMin
    );
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const canchaData = await getCanchas();
        setCanchas(canchaData);
        
        // Obtener puntuaciones para cada cancha
        const puntuacionesPromises = canchaData.map(cancha => getPuntuacionesPorCancha(cancha.id));
        const puntuacionesResults = await Promise.all(puntuacionesPromises);
        
        const initialRatings = canchaData.reduce((acc: {[key: number]: {rating: number, total: number}}, cancha: any, index: number) => {
          const puntuaciones = puntuacionesResults[index];
          const totalRatings = puntuaciones.reduce((sum, p) => sum + p.puntuacion, 0);
          acc[cancha.id] = { rating: totalRatings / puntuaciones.length || 0, total: puntuaciones.length };
          return acc;
        }, {});
        
        setRatings(initialRatings);
      } catch (err) {
        setError("Error al cargar los datos.");
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleReservar = (cancha: any) => {
    const userId = session?.user?.id;

    if (!userId) {
      alert("Debes estar autenticado para reservar.");
      console.error("User ID no disponible");
      return;
    }

    const queryParams = new URLSearchParams({
      nombre: cancha.nombre,
      tipo: cancha.tipo,
      capacidad: cancha.capacidad.toString(),
      ubicacion: cancha.ubicacion,
      imagen: cancha.imagen,
      precio: cancha.precio.toString(),
      disponibilidad: cancha.disponibilidad.toString(),
      cancha_id: cancha.id.toString(),
      user_id: userId
    });
  
    router.push(`/confirmacion-reserva?${queryParams.toString()}`);
    console.log(queryParams.toString());
  };

  const handleRating = async (canchaId: number, rating: number) => {
    const userId = session?.user?.id;

    if (!userId) {
      alert("Debes estar autenticado para calificar.");
      return;
    }

    // Inserta la puntuación en la base de datos
    try {
      await insertarPuntuacion({
        reserva_id: null,  // Deberías asociarlo a una reserva si es necesario
        usuario_id: userId,
        cancha_id: canchaId,
        puntuacion: rating,
        comentario: 'Sin comentario',  // Puedes agregar un campo de comentario si deseas
      });

      // Actualiza el estado local para reflejar la nueva puntuación
      setRatings(prev => ({
        ...prev,
        [canchaId]: {
          rating: rating,
          total: (prev[canchaId]?.total || 0) + 1
        }
      }));
      console.log(`Cancha ${canchaId} calificada con ${rating} estrellas`);
    } catch (error) {
      console.error("Error al registrar la puntuación", error);
      alert("Ocurrió un error al registrar la puntuación");
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Canchas Deportivas</h1>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {tiposDeporte.map((deporte) => (
            <Toggle
              key={deporte}
              pressed={filtrosDeporte.includes(deporte)}
              onPressedChange={() => toggleFiltroDeporte(deporte)}
              className="capitalize"
            >
              {deporte}
            </Toggle>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select value={filtroDisponibilidad} onValueChange={setFiltroDisponibilidad}>
            <SelectTrigger>
              <SelectValue placeholder="Disponibilidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="disponibles">Disponibles</SelectItem>
              <SelectItem value="no disponibles">No disponibles</SelectItem>
            </SelectContent>
          </Select>

          <div>
            <label htmlFor="precio-max" className="block text-sm font-medium text-gray-700 mb-1">
              Precio máximo: ${filtroPrecioMax}
            </label>
            <Slider
              id="precio-max"
              min={0}
              max={100000}
              step={5000}
              value={[filtroPrecioMax]}
              onValueChange={(value) => setFiltroPrecioMax(value[0])}
            />
          </div>

          <div>
            <label htmlFor="capacidad-min" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidad mínima: {filtroCapacidadMin}
            </label>
            <Slider
              id="capacidad-min"
              min={0}
              max={25}
              step={1}
              value={[filtroCapacidadMin]}
              onValueChange={(value) => setFiltroCapacidadMin(value[0])}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : canchasFiltradas.length === 0 ? (
          <p className="text-center">No se encontraron canchas con los filtros seleccionados.</p>
        ) : (
          canchasFiltradas.map((cancha) => (
            <Card key={cancha.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <Image
                src={cancha.imagen[0] || "placeholder.svg"} 
                alt={cancha.nombre}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white py-2 px-4">
                <CardTitle>{cancha.nombre}</CardTitle>
                <CardDescription>
                  <MapPinIcon className="inline-block w-4 h-4 mr-1" /> {cancha.ubicacion}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p className="flex items-center mb-2">
                  <UsersIcon className="w-4 h-4 mr-2" /> Capacidad: {cancha.capacidad} personas
                </p>
                <p className="flex items-center mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" /> {cancha.disponible ? "Disponible" : "No disponible"}
                </p>
                <p className="flex items-center mb-2">
                  <Star className="w-4 h-4 mr-2" /> {ratings[cancha.id]?.rating.toFixed(1)} ({ratings[cancha.id]?.total} valoraciones)
                </p>
                <p className="text-lg font-semibold mb-4">${cancha.precio}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
                <Button variant="default" onClick={() => handleReservar(cancha)}>Reservar</Button>
                <Button variant="secondary" onClick={() => handleRating(cancha.id, 5)}>Puntuar 5</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
