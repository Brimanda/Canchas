'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/component/auth/AuthProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { getCanchas, getPromedioYTotalPuntuacion } from "@/app/lib/canchas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Rating from '@mui/material/Rating'; 

const tiposDeporte = ["futbol", "tenis", "basquet", "voley"];

export function CanchasDeportivas() {
  const { session, isLoading } = useAuth();
  const [canchas, setCanchas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filtrosDeporte, setFiltrosDeporte] = useState<string[]>([]);
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("todas");
  const [filtroPrecioMax, setFiltroPrecioMax] = useState(0);
  const [filtroCapacidadMin, setFiltroCapacidadMin] = useState(0);
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
  
        const canchasConPuntuacion = await Promise.all(
          canchaData.map(async (cancha: any) => {
            const { promedio, total } = await getPromedioYTotalPuntuacion(cancha.id); 
            return { ...cancha, puntuacionPromedio: promedio, total_puntuaciones: total };
          })
        );
  
        setCanchas(canchasConPuntuacion);
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
              <CardHeader className="bg-gradient-to-r from-celeste-claro to-secondary text-white">
                <CardTitle>{cancha.nombre}</CardTitle>
                <CardDescription className="text-primary-foreground">
                  {cancha.tipo.charAt(0).toUpperCase() + cancha.tipo.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Rating
                    name={`rating-${cancha.id}`}
                    value={cancha.puntuacionPromedio || 0} 
                    precision={0.5}
                    readOnly 
                  />
                  <span className="ml-2 text-sm text-gray-600">({cancha.total_puntuaciones || 0} votos)</span>
                </div>
                <br />
                <div className="flex items-center mb-2">
                  <UsersIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Capacidad: {cancha.capacidad} personas</span>
                </div>
                <div className="flex items-center mb-2">
                  <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Ubicación: {cancha.ubicacion}</span>
                </div>
                <div className="flex items-center mb-2">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Disponibilidad: {cancha.disponibilidad ? "Disponible" : "No disponible"}</span>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/50 flex justify-between items-center">
                <span className="text-lg font-semibold">${cancha.precio}/hora</span>
                <Button
                  disabled={!cancha.disponibilidad}
                  onClick={() => handleReservar(cancha)}
                >
                  {cancha.disponibilidad ? "Reservar" : "No disponible"}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}