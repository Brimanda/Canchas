'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Search, PlusCircle, MapPin, Users, DollarSign, Edit, Trash } from "lucide-react"
import { deleteCancha, getCanchas } from "@/app/lib/canchas"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function CanchasDisponiblesComponent() {

  const [canchas, setCanchas] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCanchas() {
      try {
        const data = await getCanchas();
        setCanchas(data); 
      } catch (error) {
        setError("Error al cargar las canchas.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCanchas();
  }, []); 

  const handleDelete = async (canchaId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta cancha?")) {
      try {
        await deleteCancha(canchaId);
        setCanchas(canchas.filter((cancha) => cancha.id !== canchaId));
      } catch (error) {
        setError("Error al eliminar la cancha.");
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Canchas Disponibles</h1>
        <Link href="/dashboard/canchas/create">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Cancha
        </Button>
        </Link>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar canchas" className="pl-8" />
        </div>
      </div>

      {isLoading ? ( 
        <p>Cargando canchas....</p>
      ) : error ? ( 
        <p className="text-red-500">{error}</p>
      ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Disponibilidad</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Acciones</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {canchas.map((cancha) => (
            <TableRow key={cancha.id}>
              <TableCell>{cancha.id}</TableCell>
              <TableCell className="font-medium">{cancha.nombre}</TableCell>
              <TableCell>{cancha.tipo}</TableCell>
              <TableCell>
                <Badge variant={cancha.disponibilidad ? "default" : "destructive"}>
                  {cancha.disponibilidad ? "Disponible" : "No Disponible"}
                </Badge>
              </TableCell>
              <TableCell>
                <Users className="inline mr-2 h-4 w-4" />
                {cancha.capacidad}
              </TableCell>
              <TableCell>
                <MapPin className="inline mr-2 h-4 w-4" />
                {cancha.ubicacion}
              </TableCell>
              <TableCell>
                <DollarSign className="inline mr-2 h-4 w-4" />
                {cancha.precio}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/dashboard/canchas/edit/${cancha.id}`}>
                    <Button variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button variant="destructive" onClick={() => handleDelete(cancha.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
