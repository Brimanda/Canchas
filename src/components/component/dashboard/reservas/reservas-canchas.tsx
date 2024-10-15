'use client'

import { useState } from 'react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Search, MapPin, Users, DollarSign, Star, Calendar } from "lucide-react"

type Cancha = {
  id: number
  nombre: string
  tipo: string
  capacidad: number
  ubicacion: string
  precio: number
}

type Reserva = {
  id: number
  canchaId: number
  fecha: string
  nombreUsuario: string
}

type Puntuacion = {
  id: number
  canchaId: number
  rating: number
  comentario: string
  nombreUsuario: string
}

// Sample data
const canchasSample: Cancha[] = [
  { id: 1, nombre: "Cancha Central", tipo: "Fútbol", capacidad: 22, ubicacion: "Parque Deportivo", precio: 100 },
  { id: 2, nombre: "Cancha de Tenis A", tipo: "Tenis", capacidad: 4, ubicacion: "Club Deportivo", precio: 50 },
  { id: 3, nombre: "Cancha de Básquet", tipo: "Básquet", capacidad: 10, ubicacion: "Gimnasio Municipal", precio: 75 },
]

const reservasSample: Reserva[] = [
  { id: 1, canchaId: 1, fecha: "2024-03-15", nombreUsuario: "Juan Pérez" },
  { id: 2, canchaId: 1, fecha: "2024-03-16", nombreUsuario: "María García" },
  { id: 3, canchaId: 2, fecha: "2024-03-15", nombreUsuario: "Carlos Rodríguez" },
  { id: 4, canchaId: 3, fecha: "2024-03-17", nombreUsuario: "Ana Martínez" },
]

const puntuacionesSample: Puntuacion[] = [
  { id: 1, canchaId: 1, rating: 5, comentario: "Excelente cancha, muy bien mantenida", nombreUsuario: "Juan Pérez" },
  { id: 2, canchaId: 1, rating: 4, comentario: "Buena iluminación para partidos nocturnos", nombreUsuario: "María García" },
  { id: 3, canchaId: 2, rating: 5, comentario: "Perfecta para practicar tenis", nombreUsuario: "Carlos Rodríguez" },
  { id: 4, canchaId: 3, rating: 3, comentario: "Necesita mejor mantenimiento", nombreUsuario: "Ana Martínez" },
]

export function ReservasCanchasComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCanchas = canchasSample.filter(cancha =>
    cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cancha.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getReservasForCancha = (canchaId: number) =>
    reservasSample.filter(reserva => reserva.canchaId === canchaId)

  const getPuntuacionesForCancha = (canchaId: number) =>
    puntuacionesSample.filter(puntuacion => puntuacion.canchaId === canchaId)

  const getAverageRating = (canchaId: number) => {
    const ratings = getPuntuacionesForCancha(canchaId).map(p => p.rating)
    return ratings.length ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(1) : 'N/A'
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Reservas de Canchas</h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar canchas"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredCanchas.map((cancha) => (
          <div key={cancha.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{cancha.nombre}</h2>
                <Badge>{cancha.tipo}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{cancha.ubicacion}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Capacidad: {cancha.capacidad}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Precio: ${cancha.precio}/hora</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Reservas</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getReservasForCancha(cancha.id).map((reserva) => (
                    <TableRow key={reserva.id}>
                      <TableCell>
                        <Calendar className="inline mr-2 h-4 w-4" />
                        {new Date(reserva.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{reserva.nombreUsuario}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Total de reservas: {getReservasForCancha(cancha.id).length}
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Star className="mr-2 h-4 w-4" />
                      Ver Puntuaciones ({getAverageRating(cancha.id)})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Puntuaciones para {cancha.nombre}</DialogTitle>
                      <DialogDescription>
                        Calificación promedio: {getAverageRating(cancha.id)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {getPuntuacionesForCancha(cancha.id).map((puntuacion) => (
                        <div key={puntuacion.id} className="border-b pb-2">
                          <div className="flex items-center mb-1">
                            <Star className="text-yellow-400 fill-current h-4 w-4 mr-1" />
                            <span className="font-semibold">{puntuacion.rating}</span>
                            <span className="ml-2 text-sm text-gray-500">{puntuacion.nombreUsuario}</span>
                          </div>
                          <p className="text-sm">{puntuacion.comentario}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>

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