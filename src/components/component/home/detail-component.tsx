"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Concept, Model } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { getConceptById } from "@/app/lib/concepts";
import { getModelById } from "@/app/lib/models";
import { MenuIcon, XIcon } from "lucide-react"; // Importamos el icono de cerrar
import * as Dialog from "@radix-ui/react-dialog"; // Importamos el Dialog

type Data = Concept | Model;

export default function DetailPage() {
  const params = useParams();
  const type = params?.type;
  const id = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para la imagen seleccionada

  useEffect(() => {
    if (!type || !id) return;

    const idNumber = parseInt(id, 10); // Convert id to a number
    if (isNaN(idNumber)) {
      setError("Invalid ID");
      return;
    }

    async function fetchData() {
      try {
        let result: Data;
        if (type === "concept") {
          result = await getConceptById(idNumber);
        } else if (type === "model") {
          result = await getModelById(idNumber);
        } else {
          throw new Error("Invalid type");
        }
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [type, id]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!data) return <p>No data found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/BG_WEB.png')" }}>
      <div className="relative h-[30vh] w-full overflow-hidden">
        <Image src="/PORTADA-TEMPORAL.png" alt="Background" layout="fill" className="object-cover" />
      </div>
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="bg-white py-4 shadow w-full flex justify-center space-x-8">
          <Button>
            <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
              Home
            </Link>
          </Button>
          <Button>
            <Link href="/models" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
              Models
            </Link>
          </Button>
          <Button>
            <Link href="/concept-art" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
              Concept Art
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-lg font-medium hover:text-primary transition-colors">
                Works
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/works/completed" prefetch={false}>
                <DropdownMenuItem>Completed</DropdownMenuItem>
              </Link>
              <Link href="/works/not-completed" prefetch={false}>
                <DropdownMenuItem>Not Completed</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" aria-label="Open Menu">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="lg:hidden">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Home
              </Link>
              <Link href="/models" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Models
              </Link>
              <Link href="/concept-art" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Concept Art
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-lg font-medium hover:text-primary transition-colors">
                    Works
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href="/works/completed" prefetch={false}>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                  </Link>
                  <Link href="/works/not-completed" prefetch={false}>
                    <DropdownMenuItem>Not Completed</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="max-w-6xl mx-auto py-12 md:py-24">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">{data.title}</h1>
          <p className="text-lg text-muted-foreground">{data.subtitle || "Subtitle not available"}</p>
        </div>
        <div className="grid gap-8 mt-12 md:mt-16">
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold text-foreground">Details Description</h2>
            <p className="text-muted-foreground">{data.description}</p>
          </div>
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold text-foreground">Image Gallery</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {data.images && data.images.length > 0 ? (
                data.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={data.title}
                      width={300}
                      height={300}
                      className="rounded-lg cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg"
                      onClick={() => setSelectedImage(image)} // Al hacer clic, se establece la imagen seleccionada
                    />
                  </div>
                ))
              ) : (
                <p>No images available.</p>
              )}
            </div>
          </div>

          {type === "model" && data.video && (
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold text-foreground">Video Showcase</h2>
              <div className="w-full mx-auto">
                <video width="240" height="120" controls className="rounded-lg shadow-lg">
                  <source src={data.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialog para mostrar la imagen expandida */}
      <Dialog.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="relative">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Expanded Image"
                width={800} // Ajusta el tamaño según sea necesario
                height={800}
                className="rounded-lg"
              />
            )}
            {/* Botón de cierre */}
            <Dialog.Close asChild>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 text-white right-2 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-70"
              >
                <XIcon className="h-6 w-6 text-white bg-white" /> {/* Icono blanco */}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
