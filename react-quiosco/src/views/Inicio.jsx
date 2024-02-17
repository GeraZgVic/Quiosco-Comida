import  useSWR  from 'swr';
import Producto from "../components/Producto"; // Importa el componente de Producto
import useQuiosco from "../hooks/useQuiosco"; // Importa el hook personalizado useQuiosco
import clienteAxios from '../../config/axios';

// Componente funcional para la página de inicio
export default function Inicio() {

  // Utiliza el hook useQuiosco para obtener la categoría actual del contexto
  const { categoriaActual } = useQuiosco();

  // Consulta SWR para Productos
  const token = localStorage.getItem('auth_token');
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })
  if(isLoading) return 'Cargando...'

  // Filtra los productos basándose en la categoría actual
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id);


  // Renderiza la página de inicio con los productos filtrados
  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación.</p>

      {/* Renderiza los productos en una cuadrícula */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map(producto => (
          <Producto 
            key={producto.id}
            producto={producto}
            botonAgregar = {true}
          />
        ))}
      </div>
    </>
  );
}
