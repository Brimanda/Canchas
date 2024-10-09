'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XIcon, PlusIcon, UploadIcon } from 'lucide-react'
import { getCanchaById, updateCancha } from '@/app/lib/canchas'
import { Cancha } from '@/app/types'
import { supabase } from '@/app/lib/supabase'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const supabaseStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/canchas/"

export function EditCanchaComponent() {
  const router = useRouter()
  const params = useParams()
  const canchaId = Number(params.canchaId)
  const [cancha, setCancha] = useState<Cancha | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    async function fetchCanchas() {
      try {
        const data = await getCanchaById(canchaId)
        setCancha(data)
      } catch (err) {
        console.error("Error encontrando datos de canchas:", err)
        setError("Error al cargar la cancha deportiva.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCanchas()
  }, [canchaId])

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCancha(prevCancha => prevCancha ? { ...prevCancha, name: e.target.value } : prevCancha)
  }

  const handleTipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCancha(prevCancha => prevCancha ? { ...prevCancha, type: e.target.value } : prevCancha)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCancha(prevCancha => prevCancha ? { ...prevCancha, price: Number(e.target.value) } : prevCancha)
  }

  const handleAvailabilityChange = (checked: boolean) => {
    setCancha(prevCancha => prevCancha ? { ...prevCancha, isAvailable: checked } : prevCancha)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      setError(null);

      const files = Array.from(e.target.files);
      const newImages: string[] = [];

      for (const file of files) {
        const fileName = `${Math.random()}-${file.name}`.replace(/\s/g, "");
        const { data, error: uploadError } = await supabase.storage
          .from("canchas")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error al subir la imagen:", uploadError);
          setError("Error al subir la imagen.");
          return;
        }

        if (data) {
          const publicUrl = `${supabaseStorageUrl}/${data.path}`;
          newImages.push(publicUrl);
        } else {
          throw new Error("Error inesperado al subir la imagen");
        }
      }

      setCancha((prevCancha) => {
        if (prevCancha) {
          return {
            ...prevCancha,
            images: [...prevCancha.imagen, ...newImages],
          };
        }
        return null
      });

      setIsLoading(false);
    }
  };



  const handleDeleteImage = async (imageUrl: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      try {
        const fileName = imageUrl.split("/").pop();

        const { error: storageError } = await supabase.storage
          .from("canchas")
          .remove([fileName as string]);
        if (storageError) throw storageError;

        setCancha((prevCancha) => {
          if (prevCancha) {
            return {
              ...prevCancha,
              images: prevCancha.imagen.filter((img: string) => img !== imageUrl),
            };
          }
          return prevCancha;
        });

      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        setError("Error al eliminar la imagen.");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (cancha) {
      setIsLoading(true)
      setError(null)

      try {
        await updateCancha(cancha.id, cancha)
        setIsEditing(false)
        alert("Cancha deportiva actualizada con éxito.")
        router.push("/dashboard/canchas")
      } catch (error) {
        console.error("Error al actualizar la cancha deportiva:", error)
        setError("Error al actualizar la cancha deportiva.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Cancha Deportiva</h1>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Nombre de la Cancha</Label>
          <Input
            id="name"
            value={cancha?.nombre || ""}
            onChange={handleNombreChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="selectTipo">Tipo de Cancha</Label>
          <Select
            value={cancha?.tipo || ""}
            onValueChange={(value) => setCancha(prevCancha => prevCancha ? { ...prevCancha, tipo: value } : prevCancha)}
            disabled={!isEditing}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo de cancha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="futbol">Fútbol</SelectItem>
              <SelectItem value="tenis">Tenis</SelectItem>
              <SelectItem value="basquet">Básquet</SelectItem>
              <SelectItem value="voley">Vóley</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div>
          <Label htmlFor="price">Precio por Hora</Label>
          <Input
            id="price"
            type="number"
            value={cancha?.precio || ""}
            onChange={handlePriceChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isAvailable"
            checked={cancha?.disponibilidad || false}
            onCheckedChange={handleAvailabilityChange}
            disabled={!isEditing}
          />
          <Label htmlFor="isAvailable">Disponible para Reservas</Label>
        </div>
        <div>
          <Label>Imágenes</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {cancha?.imagen && cancha.imagen.map((image, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-2">
                  <Image src={image} alt={`Cancha ${index + 1}`} width={200} height={150} className="rounded-lg" />
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {isEditing && (
            <div className="mt-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges}>
                Guardar Cambios
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}