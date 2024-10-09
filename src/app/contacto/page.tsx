"use client";

import { useAuth } from "@/components/component/auth/AuthProvider";
import { ContactoComponent } from "@/components/component/home/contacto";
import { FooterComponent } from "@/components/component/home/footer";
import { HeaderComponent } from "@/components/component/home/header";

export default function Contacto(){
    return (
        <><><HeaderComponent /><ContactoComponent /></><FooterComponent /></>
    )
}