import { JSX, SVGProps } from "react"


function Header() {
  return (
    <div>
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 w-8"
            width="64"
            height="64"
            style={{ aspectRatio: "32/32", objectFit: "cover" }}
          />
        </div>
        <div className="flex items-center space-x-4">
          <a href="/auth/login" className="flex items-center text-sm text-muted-foreground">
            <LogInIcon className="mr-1" />
            Inicio Sesión
          </a>
          <a href="/auth/register" className="flex items-center text-sm text-muted-foreground">
            <UserIcon className="mr-1" />
            Registrarse
          </a>
          <a href="#" className="flex items-center text-sm text-muted-foreground">
            <ShoppingCartIcon className="mr-1" />
            (0)
          </a>
        </div>
      </header>
    </div>
  )
}
function NavBar() {
  return (
    <div id="header">
      <nav className="bg-celeste-claro py-2">
        <div className="flex justify-center space-x-8 text-white">
          <a href="/" className="font-bold">
            Inicio
          </a>
          <a href="/canchas" className="hover:text-gray-200">
            Canchas
          </a>
          <a href="/nosotros" className="hover:text-gray-200">
            Nosotros
          </a>
          <a href="/contacto" className="hover:text-gray-200">
            Contacto
          </a>
        </div>
      </nav>
    </div>
  )
}
export function HeaderComponent() {
  return (
    <div>
      <Header />
      <NavBar />
    </div>
  )
}

function LogInIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}


function ShoppingCartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}