"use client"; 
import { SVGProps, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 
import { useAuth } from "./AuthProvider";
import Link from "next/link";

export function LoginPage() {
  const { signIn, session, userType } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    try {
      await signIn(email, password);
      
      if (userType === "arrendador") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message); 
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
          <p className="text-muted-foreground">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>} 

          <div className="flex flex-col gap-2">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Iniciar Sesión
            </Button>
          </div>
        </form>
        <div className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
          <br />
          <br />
          <Link href="/" className="text-blue-600 hover:underline">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
