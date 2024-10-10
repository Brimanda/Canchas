'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, UsersIcon, SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

type Reserva = {
  id: string;
  fecha: string;
  ubicacion: string;
  capacidad: number;
  estado: "confirmada" | "pendiente" | "cancelada";
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function ReservasAnteriores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Reserva['estado'] | 'todas'>('todas');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerReservas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservas') 
      .select('*');

    if (error) {
      console.error('Error al obtener reservas:', error);
      setError('Ocurrió un error al cargar las reservas.');
    } else {
      setReservas(data as Reserva[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const filteredReservas = reservas.filter(reserva => 
    (reserva.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     reserva.fecha.includes(searchTerm)) &&
    (filterStatus === 'todas' || reserva.estado === filterStatus)
  );

  if (loading) {
    return <div className="text-center">Cargando reservas...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

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
                          {reserva.ubicacion}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <UsersIcon className="mr-2 h-4 w-4 text-sky-600" />
                          {reserva.capacidad}
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
  );
}

const getBadgeColor = (estado: Reserva['estado']) => {
  switch (estado) {
    case "confirmada":
      return "bg-green-500";
    case "pendiente":
      return "bg-yellow-500";
    case "cancelada":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
