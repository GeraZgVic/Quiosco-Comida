import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {
    const {logout} = useAuth({middleware: 'auth'});
  return (
    <aside className="md:w-72  h-screen">
       <div className="p-4">
            <img 
                src="/img/logo.svg"
                alt="Imagen logotipo"
                className="w-40"
            />
       </div>
    <nav className="flex justify-center gap-4">
          <Link
            to='/admin'
            className="font-bold text-lg p-2 hover:border-b-4 hover:border-indigo-400 focus:outline-none  focus:border-b-4 focus:border-indigo-600"
          >
            Ordenes
          </Link>
          <Link
            to='/admin/productos'
            className="font-bold text-lg p-2 hover:border-b-4 hover:border-indigo-400 focus:outline-none  focus:border-b-4 focus:border-indigo-600"
          >
            Productos
          </Link>
    </nav>

       <div className="my-5 px-5">
          <button
            onClick={logout}
            type="button"
            className="text-center bg-red-500 transition duration-300 ease-out hover:bg-red-700 w-full p-3 font-bold text-white truncate">
            Cerrar Sesión
          </button>
      </div>
        
    </aside>
  )
}
