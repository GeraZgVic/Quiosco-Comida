import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";
import { useAuth } from "../hooks/useAuth";


export default function Resumen() {
  const {logout} = useAuth({});
  
  const {pedido, total, handleSubmitNuevaOrden} = useQuiosco();
  // Si es 0 es true
  const HabilitarBtnPedido = () => pedido.length === 0;
  
  const handleSubmit = e => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);
  }
  
  return (
    <aside 
      className="w-72 h-screen overflow-y-scroll p-5">
      <h1 
        className="text-4xl font-black"
        >
          Mi Pedido
      </h1>
      <p 
        className="text-lg my-5 text-gray-600"
        >
          Aquí podrás ver el resumen y totales de tu pedido
      </p>

      <div
        className="py-10">
        {pedido.length === 0 ? (
              <p className="text-center text-2xl">
                  No hay elementos en tu pedido aún
              </p>
            ) : (
              
                pedido.map(producto =>  (
                  
                  <ResumenProducto 
                    key={producto.id}
                    producto={producto}
                  />
              ))
          )}
      </div>
      <p 
        className="text-xl mt-10">
          Total: {formatearDinero(total)}
      </p>
      <form 
        className="w-full"
        onSubmit={handleSubmit}
      >
        <input 
          className={`${HabilitarBtnPedido() ? 'bg-indigo-300': 'bg-indigo-600 hover:bg-indigo-800'} 
          px-5 py-2 ronuded uppercase
          font-bold text-white text-center w-full cursor-pointer`}
          type="submit" 
          value="Confirmar Pedido"
          disabled={HabilitarBtnPedido()}
        />

      </form>
    </aside>
  )
}
