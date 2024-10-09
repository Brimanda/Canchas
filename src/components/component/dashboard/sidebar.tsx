'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home, Calendar, Layout, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gray-800 overflow-y-auto lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl font-bold text-white">Logo</h1>
          </div>
          <nav className="flex-grow">
            <ul className="flex flex-col py-4">
              <li>
                <Link href="/dashboard" className="flex items-center px-6 py-4 text-gray-100 hover:bg-gray-700">
                  <Home className="h-5 w-5 mr-3" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="flex items-center px-6 py-4 text-gray-100 hover:bg-gray-700">
                  <Calendar className="h-5 w-5 mr-3" />
                  Reservas
                </Link>
              </li>
              <li>
                <Link href="/canchas" className="flex items-center px-6 py-4 text-gray-100 hover:bg-gray-700">
                  <Layout className="h-5 w-5 mr-3" />
                  Canchas
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}