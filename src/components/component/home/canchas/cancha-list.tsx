import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { getCanchas } from "@/app/lib/canchas";

const tiposDeporte = ["futbol", "tenis", "basquet", "voley"];

export function CanchasDeportivas({ userId }) {  // Asegúrate de recibir el userId como prop
  const [canchas, setCanchas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtrosDeporte, setFiltrosDeporte] = useState<string[]>([]);
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("todas");
  const [filtroPrecioMax, setFiltroPrecioMax] = useState(60);
  const [filtroCapacidadMin, setFiltroCapacidadMin] = useState(0);

  const router = useRouter(); // Inicializa el router para la navegación

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
      } catch (err) {
        setError("Error al cargar los datos.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const transformedData = useMemo(() => {
    return [...canchas].slice(0, 12).map(item => ({
      ...item,
      image_url: item.imagen && item.imagen.length > 0 ? item.imagen : "/placeholder.svg"
    }));
  }, [canchas]);

  const handleReservar = (cancha: any) => {
    const queryParams = new URLSearchParams({
      nombre: cancha.nombre,
      tipo: cancha.tipo,
      capacidad: cancha.capacidad.toString(),
      ubicacion: cancha.ubicacion,
      precio: cancha.precio.toString(),
      disponibilidad: cancha.disponibilidad.toString(),
      cancha_id: cancha.id.toString(),  // Asegúrate de pasar el cancha_id
      user_id: userId,  // Asegúrate de pasar el user_id
    });
  
    router.push(`/confirmacion-reserva?${queryParams.toString()}`);
    console.log(queryParams.toString());
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <h2>Filtrar Canchas</h2>
        <Select onValueChange={toggleFiltroDeporte}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un deporte" />
          </SelectTrigger>
          <SelectContent>
            {tiposDeporte.map((deporte) => (
              <SelectItem key={deporte} value={deporte}>{deporte}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Otros filtros como Slider y Toggle pueden ser añadidos aquí */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {canchasFiltradas.map((cancha) => (
          <Card key={cancha.id} className="relative">
            <Image
              src={cancha.image_url}
              alt={cancha.nombre}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{cancha.nombre}</CardTitle>
              <CardDescription>{cancha.tipo}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ubicación: {cancha.ubicacion}</p>
              <p>Capacidad: {cancha.capacidad}</p>
              <p>Precio: ${cancha.precio}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleReservar(cancha)}>Reservar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
