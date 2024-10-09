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
import { Search, PlusCircle, MapPin, Users, DollarSign } from "lucide-react"

// Datos de ejemplo para las canchas
const canchas = [
  { id: 1, nombre: "Cancha Principal", tipo: "Fútbol", disponibilidad: true, capacidad: 22, ubicacion: "Zona Norte", precio: 100 },
  { id: 2, nombre: "Cancha de Tenis 1", tipo: "Tenis", disponibilidad: false, capacidad: 4, ubicacion: "Zona Este", precio: 50 },
  { id: 3, nombre: "Cancha de Básquet", tipo: "Básquet", disponibilidad: true, capacidad: 10, ubicacion: "Zona Central", precio: 75 },
  { id: 4, nombre: "Cancha de Vóley", tipo: "Vóley", disponibilidad: true, capacidad: 12, ubicacion: "Zona Oeste", precio: 60 },
  { id: 5, nombre: "Cancha de Fútbol 5", tipo: "Fútbol", disponibilidad: true, capacidad: 10, ubicacion: "Zona Sur", precio: 80 },
]

export function CanchasDisponiblesComponent() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Canchas Disponibles</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Cancha
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar canchas" className="pl-8" />
        </div>
      </div>

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {canchas.map((cancha) => (
            <TableRow key={cancha.id}>
              <TableCell>{cancha.id}</TableCell>
              <TableCell className="font-medium">{cancha.nombre}</TableCell>
              <TableCell>{cancha.tipo}</TableCell>
              <TableCell>
                <Badge variant={cancha.disponibilidad ? "success" : "destructive"}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>

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