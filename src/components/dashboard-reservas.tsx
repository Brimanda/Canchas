'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon, TrendingUpIcon, ClockIcon, CheckCircleIcon } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Datos de muestra para las estadísticas
const stats = [
  { title: "Total Reservas", value: 1234, icon: CalendarIcon },
  { title: "Reservas Hoy", value: 56, icon: ClockIcon },
  { title: "Tasa de Ocupación", value: "78%", icon: TrendingUpIcon },
  { title: "Reservas Confirmadas", value: 987, icon: CheckCircleIcon },
]

// Datos de muestra para el gráfico
const chartData = [
  { name: 'Ene', reservas: 65 },
  { name: 'Feb', reservas: 59 },
  { name: 'Mar', reservas: 80 },
  { name: 'Abr', reservas: 81 },
  { name: 'May', reservas: 56 },
  { name: 'Jun', reservas: 55 },
  { name: 'Jul', reservas: 40 },
]

// Datos de muestra para las últimas reservas
const ultimasReservas = [
  { id: "1", fecha: "2023-07-15", lugar: "Restaurante El Olivo", personas: 4, estado: "confirmada" },
  { id: "2", fecha: "2023-07-16", lugar: "Café Central", personas: 2, estado: "pendiente" },
  { id: "3", fecha: "2023-07-17", lugar: "Bar La Terraza", personas: 6, estado: "cancelada" },
  { id: "4", fecha: "2023-07-18", lugar: "Restaurante Mar Azul", personas: 3, estado: "confirmada" },
  { id: "5", fecha: "2023-07-19", lugar: "Pizzería Bella Italia", personas: 5, estado: "pendiente" },
]

const getBadgeColor = (estado: string) => {
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

export function DashboardReservasComponent() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Reservas</h1>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Reservas por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservas" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Últimas Reservas */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Lugar</TableHead>
                <TableHead>Personas</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ultimasReservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(reserva.fecha).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {reserva.lugar}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <UsersIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {reserva.personas}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getBadgeColor(reserva.estado)} text-white`}>
                      {reserva.estado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}