'use client'

import { useEffect, useState } from 'react'
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
import { Search, MapPin, Users, DollarSign, Calendar } from "lucide-react"
import { supabase } from '@/app/lib/supabase'

type Cancha = {
  id: number
  nombre: string
  tipo: string
  capacidad: number
  ubicacion: string
  precio: number
  propietario_id: string
}

type Reserva = {
  id: number
  cancha_id: number
  fecha: string
  nombre_cancha: string
  ubicacion: string
  capacidad: number
  puntuacion: number
  comentario: string
}

export function ReservasCanchasComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [canchas, setCanchas] = useState<Cancha[]>([])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [arrendatarioId, setArrendatarioId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setArrendatarioId(session?.user?.id || null); 
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (arrendatarioId) {
        const { data: canchasData, error: canchasError } = await supabase
          .from('canchas')
          .select('*')
          .eq('propietario_id', arrendatarioId);

        if (canchasError) {
          console.error('Error fetching canchas:', canchasError);
        } else {
          setCanchas(canchasData);
        }

        const { data: reservasData, error: reservasError } = await supabase
          .from('reservas')
          .select('*');

        if (reservasError) {
          console.error('Error fetching reservas:', reservasError);
        } else {
          setReservas(reservasData);
        }
      }
    };

    fetchData();
  }, [arrendatarioId]);

  const filteredCanchas = canchas.filter(cancha =>
    (cancha.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cancha.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getReservasForCancha = (canchaId: number) =>
    reservas.filter(reserva => reserva.cancha_id === canchaId);

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
                      <TableCell>{reserva.nombre_cancha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Total de reservas: {getReservasForCancha(cancha.id).length}
                </span>
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
