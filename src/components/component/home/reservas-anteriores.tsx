'use client'

import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPinIcon, UsersIcon, SearchIcon } from "lucide-react"
import { motion } from "framer-motion"

type Reserva = {
  id: string
  fecha: string
  lugar: string
  personas: number
  estado: "confirmada" | "pendiente" | "cancelada"
}

const reservas: Reserva[] = [
  { id: "1", fecha: "2023-05-15", lugar: "Restaurante El Olivo", personas: 4, estado: "confirmada" },
  { id: "2", fecha: "2023-06-20", lugar: "Café Central", personas: 2, estado: "pendiente" },
  { id: "3", fecha: "2023-07-05", lugar: "Bar La Terraza", personas: 6, estado: "cancelada" },
  { id: "4", fecha: "2023-08-10", lugar: "Restaurante Mar Azul", personas: 3, estado: "confirmada" },
  { id: "5", fecha: "2023-09-15", lugar: "Pizzería Bella Italia", personas: 5, estado: "pendiente" },
]

const getBadgeColor = (estado: Reserva['estado']) => {
  switch (estado) {
    case "confirmada":
      return "bg-green-500"
    case "pendiente":
      return "bg-yellow-500"
    case "cancelada":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function ReservasAnteriores() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<Reserva['estado'] | 'todas'>('todas')

  const filteredReservas = reservas.filter(reserva => 
    (reserva.lugar.toLowerCase().includes(searchTerm.toLowerCase()) ||
     reserva.fecha.includes(searchTerm)) &&
    (filterStatus === 'todas' || reserva.estado === filterStatus)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-sky-900 text-center mb-8">Mis Reservas Anteriores</h1>
        </motion.div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Buscar por lugar o fecha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Select value={filterStatus} onValueChange={(value: Reserva['estado'] | 'todas') => setFilterStatus(value)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="confirmada">Confirmadas</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                  <SelectItem value="cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>Total de reservas: {filteredReservas.length}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Fecha</TableHead>
                    <TableHead>Lugar</TableHead>
                    <TableHead>Personas</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservas.map((reserva, index) => (
                    <motion.tr
                      key={reserva.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-sky-600" />
                          {new Date(reserva.fecha).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPinIcon className="mr-2 h-4 w-4 text-sky-600" />
                          {reserva.lugar}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <UsersIcon className="mr-2 h-4 w-4 text-sky-600" />
                          {reserva.personas}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={`${getBadgeColor(reserva.estado)} text-white`}>
                          {reserva.estado}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}