import React from 'react'
import { DollarSign, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className="relative h-screen flex items-center text-blanco">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
            ></div>
            <div className="absolute inset-0 opacity-80 bg-negro backdrop-blur-2xl"></div>
            <div className="relative z-10 container mx-auto text-center text-white">
                <h1 className="text-7xl font-bold mb-4">Somos tu match perfecto</h1>
                <p className="text-3xl mb-8">Encuentra la cancha perfecta o rentabiliza tu espacio deportivo</p>
                <div className="flex justify-center space-x-8 mb-8">
                    <div className="flex items-center">
                        <DollarSign className="mr-2" size={28} />
                        <span>Precios competitivos</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-2" size={28} />
                        <span>Comunidad deportiva</span>
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="mr-2" size={28} />
                        <span>Gestión simplificada</span>
                    </div>
                </div>
                <div className="flex justify-center space-x-4">
                    <Link href="/canchas" className="bg-celeste-claro hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105">
                        Buscar canchas
                    </Link>
                    <Link href="/auth/register" className="bg-verde-claro hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105">
                        Registrar mi cancha
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default Hero