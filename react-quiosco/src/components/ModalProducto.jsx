import { useState, useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

export default function ModalProducto() {

const {handleClickModal, producto, handleAgregarPedido,pedido} = useQuiosco();
const [cantidad,setCantidad] = useState(1);
const [edicion, setEdicion] = useState(false);
const {nombre,imagen,precio} = producto;

useEffect(()=> {
    if(pedido.some(pedidoState => pedidoState.id === producto.id)){
        const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
        setCantidad(productoEdicion.cantidad);
        setEdicion(true);
    } 
},[pedido])

// console.log(producto)
  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <img 
                alt={`Imagen Producto ${nombre}`}
                src={`/img/${imagen}.jpg`}
            />
        </div>

        <div className="md:w-2/3">
            <div className="flex justify-end">
            <button
                type="button"
                onClick={handleClickModal}
                className="focus:outline-none hover:text-gray-600 transition duration-300 p-2 md:p-0"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">
                {nombre}
            </h1>
            <p className="text-5xl font-bold text-amber-500 mt-5">
                {formatearDinero(precio)}
            </p>

           <div className="flex gap-4 mt-5">
            <button
                type="button"
                onClick={() => {
                    if(cantidad <= 1) return;
                    setCantidad(cantidad - 1);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>

            </button>
               <p className="text-3xl">{cantidad}</p>

            <button
                type="button"
                onClick={() => {
                    if(cantidad >= 5) return;
                    setCantidad(cantidad + 1);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
           </div>

            <button 
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white
            font-bold rounded"
            onClick={ ()=> {
                handleAgregarPedido({...producto, cantidad});
                handleClickModal(); // Cerrar modal
                }}
            >
                {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
            </button>


            
        </div>
    </div>
  )
}
