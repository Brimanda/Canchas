"use client";

import { useAuth } from "@/components/component/auth/AuthProvider";
import { HeaderComponent } from "@/components/component/home/header";
import { FooterComponent } from "@/components/component/home/footer";
import { ReservasAnteriores } from "@/components/component/home/reservas-anterioresssss";

export default function Nosotros(){
    return (
        <><><HeaderComponent /><ReservasAnteriores /></><FooterComponent /></>
    )
}