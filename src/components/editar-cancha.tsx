'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MapPin, Users, DollarSign, Image } from "lucide-react"

export function EditarCanchaComponent() {
  const [disponibilidad, setDisponibilidad] = useState(true)
  const [imagenNombre, setImagenNombre] = useState("cancha_principal.jpg")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí iría la lógica para enviar los datos del formulario
    console.log("Formulario de edición enviado")
  }

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagenNombre(event.target.files[0].name)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Editar Cancha</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Cancha</Label>
            <Input id="nombre" defaultValue="Cancha Principal" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Cancha</Label>
            <Select defaultValue="futbol">
              <SelectTrigger id="tipo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futbol">Fútbol</SelectItem>
                <SelectItem value="tenis">Tenis</SelectItem>
                <SelectItem value="basquet">Básquet</SelectItem>
                <SelectItem value="voley">Vóley</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad</Label>
            <div className="relative">
              <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="capacidad" type="number" className="pl-8" defaultValue="22" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="ubicacion" className="pl-8" defaultValue="Zona Norte" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="precio">Precio por Hora</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="precio" type="number" className="pl-8" defaultValue="100" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="disponibilidad">Disponibilidad</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="disponibilidad"
                checked={disponibilidad}
                onCheckedChange={setDisponibilidad}
              />
              <Label htmlFor="disponibilidad">
                {disponibilidad ? "Disponible" : "No Disponible"}
              </Label>
            </div>
          </div>
          <div className="space-y-2 col-span-full">
            <Label htmlFor="imagen">Imagen de la Cancha</Label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <Image className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="imagen"
                  type="file"
                  accept="image/*"
                  className="pl-8"
                  onChange={handleImagenChange}
                />
              </div>
              <span className="text-sm text-muted-foreground">{imagenNombre}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">Cancelar</Button>
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </div>
  )
}