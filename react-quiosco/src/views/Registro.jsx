import {createRef, useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

  const {registro} = useAuth({middleware: 'guest', url: '/'});


  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationdRef = createRef();

  // Alerta de errores
  const [errores,setErrores] = useState([]); 

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationdRef.current.value
    }
    registro(datos,setErrores);
  }


  return (
    <>
      <h1 className="text-4xl font-bold">Crea tu Cuenta</h1>
      <p >Crea tu Cuenta llenando el siguiente formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}  
          noValidate
        >
          {errores ? errores.map((error,index) => <Alerta key={index}>{error}</Alerta>) : null}
          
          
          
            <div className="mb-4">
              <label
                className="text-slate-800"
                htmlFor="name"
              >Nombre:
              </label>
              <input 
                type="text"
                id="name" 
                className="mt-2 p-3 w-full bg-gray-50"
                name="name"
                placeholder="Tu Nombre"
                ref={nameRef}
              />
            </div>
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
            <div className="mb-4">
              <label
                className="text-slate-800"
                htmlFor="password_confirmation"
              >Repetir Password:
              </label>
              <input 
                type="password"
                id="password_confirmation" 
                className="mt-2 p-3 w-full bg-gray-50"
                name="password_confirmation"
                placeholder="Repetir Password"
                ref={passwordConfirmationdRef}
              />
            </div>

            <input
              type="submit"
              value="Crear Cuenta"
              className="bg-indigo-600 text-white w-full mt-5 p-4 uppercase font-bold cursor-pointer rounded-sm 
              transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-indigo-800 hover:bg-indigo-800 "
            />

        </form>
      </div>
      <nav className="mt-5"> 
            <Link to="/auth/login">
              ¿Ya tienes cuenta? Inicia Sesión
            </Link>
      </nav>
    </>
  )
}
