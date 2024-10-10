"use client";

import { useAuth } from "@/components/component/auth/AuthProvider";
import { ConfirmacionReservaComponent } from "@/components/component/home/confirmacion-reserva";
;
import { FooterComponent } from "@/components/component/home/footer";
import { HeaderComponent } from "@/components/component/home/header";

export default function Contacto(){
    return (
        <><><HeaderComponent /><ConfirmacionReservaComponent /></><FooterComponent /></>
    )
}