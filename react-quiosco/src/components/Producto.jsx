import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export default function Producto({producto, botonAgregar = false, botonDisponible = false}) {

  // Utiliza el hook useQuiosco para obtener la categoría actual del contexto
  const { handleClickModal, handleSetProducto, handleClickProductoAgotado} = useQuiosco();

  const {nombre,precio,imagen} = producto;



  return (
    <div className="border p-3 shadow bg-white">
      <img 
        className="w-full"
        src={`/img/${imagen}.jpg`} 
        alt={`imagen ${imagen}`} 
        />

        <div className="p-5">
          <h3 className="text-2xl font-bold">
              {nombre}
          </h3>
          <p className="mt-5 font-black text-4xl text-amber-500">
              {formatearDinero(precio)}
          </p>

          {botonAgregar && (
            <button
              type="button"
              className="bg-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
              onClick={() => {
                handleClickModal();
                handleSetProducto(producto);
                
              }}
            >
              Agregar
            </button>
          )}

          {botonDisponible && (
            <button
              type="button"
              className="bg-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
              onClick={() => handleClickProductoAgotado(producto.id)}
          >
            Producto agotado
          </button>
        )}
        </div>
    </div>
  )
}
