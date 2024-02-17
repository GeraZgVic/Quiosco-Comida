import { createContext, useState, useEffect } from "react"; // Importa funciones necesarias desde React
// import { categorias as categoriasDB } from "../data/categorias"; // Importa 'categorias' desde el archivo de datos js
import { toast } from 'react-toastify';
import clienteAxios from "../../config/axios";

// Crea un contexto de React para compartir datos entre componentes
const QuioscoContext = createContext();

// Proveedor de contexto que utiliza useState para gestionar el estado local
const QuioscoProvider = ({ children }) => {

    // Estado local para almacenar las categorías
    const [categorias, setCategorias] = useState([]);

    // Estado local para almacenar la categoría actual (inicializada con la primera categoría)
    const [categoriaActual, setCategoriaActual] = useState({});
    // Estado local para el modal
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const nuevoTotal = pedido.reduce((acumuladorTotal, producto) => (producto.precio * producto.cantidad) + acumuladorTotal, 0)
        setTotal(nuevoTotal)
    },[pedido])

    // Importar Categorias de Laravel
    const obtenerCategorias = async () => {
        const token = localStorage.getItem('auth_token');
        try {
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    },[])


    // Manejador de clics en las categorías que actualiza la categoría actual
    const handleClickCategoria = id => {
        // Filtra la categoría correspondiente al ID y actualiza el estado
        const categoria = categorias.find(categoria => categoria.id === id);
        setCategoriaActual(categoria);
    };

    // Si modal es false da por implicito un true y viceversa(automaticamente)(cerrar modal)
    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido= id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado);
        toast.success('Eliminado del Pedido',{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? 
                producto : pedidoState);
            setPedido(pedidoActualizado);
            toast.success('Guardado Correctamente',{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setPedido([...pedido, producto]); //Pedido [] se le agrega el objeto producto
            toast.success('Agregado Correctamente',{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('auth_token');
        try {
            const {data} = await clienteAxios.post('/api/pedidos', {
                total, 
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            // Vaciar el pedido despues de un segundo
            setTimeout(() => {
                setPedido([]);
            },1000)

            // Cerrar sesion despues del pedido
            setTimeout(() => {
                logout();
            },3000)

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('auth_token');
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('auth_token');
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    // Proporciona el contexto con valores necesarios a los componentes hijos
    return (
        <QuioscoContext.Provider  
            value={{
                categorias,            // Lista de categorías
                categoriaActual,       // Categoría actual seleccionada
                handleClickCategoria,   // Función para manejar clics en categorías
                modal,
                handleClickModal,        // Función para manejar clics en el modal
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >   
            {children}  {/* Renderiza los componentes hijos dentro del proveedor de contexto */}
        </QuioscoContext.Provider>
    );
};

// Exporta el proveedor de contexto y el contexto para su uso en otros componentes
export { QuioscoProvider };
export default QuioscoContext;  // Exporta el contexto por defecto
