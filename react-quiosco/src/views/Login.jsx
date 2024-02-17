import {createRef, useState} from 'react'
import {Link} from 'react-router-dom'
// import clienteAxios from '../../config/axios';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';


export default function Login() {


  const emailRef = createRef();
  const passwordRef = createRef();


  // Alerta de errores
  const [errores,setErrores] = useState([]); 
  // Hook para autenticacion
  const { login } = useAuth({middleware:'guest', url:'/'});


  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    login(datos,setErrores);

  }


  return (
    <>
      <h1 className="text-4xl font-bold">Iniciar Sesión</h1>
      <p >Inicia sesión para ordenar un pedido</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
        {errores ? errores.map((error, index) => <Alerta  key={index}>{error} </Alerta>) : null}
        
              <div className="mb-4">
                  <label
                    className="text-slate-800"
                    htmlFor="email"
                  >Email:
                  </label>
                  <input 
                    type="email"
                    id="email" 
                    className="mt-2 p-3 w-full bg-gray-50"
                    name="email"
                    placeholder="Tu Email"
                    ref={emailRef}
                  />
              </div>
              <div className="mb-4">
                  <label
                    className="text-slate-800"
                    htmlFor="password"
                  >Password:
                  </label>
                  <input 
                    type="password"
                    id="password" 
                    className="mt-2 p-3 w-full bg-gray-50"
                    name="password"
                    placeholder="Tu Password"
                    ref={passwordRef}
                  />
              </div>
            

              <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-indigo-600 text-white w-full mt-5 p-4 uppercase font-bold cursor-pointer rounded-sm 
                transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-indigo-800 hover:bg-indigo-800 "
              />
        </form>
      </div>

      <nav className="mt-5"> 
            <Link to="/auth/registro">
            ¿No tienes cuenta? Crea una
            </Link>
      </nav>
    </>
  )
}
