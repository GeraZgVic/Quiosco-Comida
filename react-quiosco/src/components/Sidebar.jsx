import { useAuth } from "../hooks/useAuth"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

export default function Sidebar() {
  
  
  const {categorias} = useQuiosco()
  const {logout, user} = useAuth({middleware: 'auth'});
  

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img
          className="w-40" 
          src="img/logo.svg" 
          alt="Logotipo" 
        />
      </div>

      <p className="text-gray-600 text-center p-2 font-bold text-xl">Hola: <span className="font-normal">{user?.name}</span></p>

      <div className="mt-10">
        {categorias.map(categoria => (

          <Categoria
            key={categoria.id}
            categoria={categoria}
          />

        ))}
      </div>

      <div className="my-5 px-5">
          <button
            onClick={logout}
            type="button"
            className="text-center bg-red-500 transition duration-300 ease-out hover:bg-red-700 w-full p-3 font-bold text-white truncate">
            Cancelar Orden
          </button>
      </div>
      

      </aside>
  )
}
