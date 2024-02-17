import { Outlet } from "react-router-dom";
import Modal from 'react-modal';
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/style.css'
import useQuiosco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";
import { useAuth } from "../hooks/useAuth";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function Layout() {
  // Instanciar middleware para el componente
  useAuth({middleware: 'auth'});
  // console.log(user)
  // console.log(error)

  const {modal} = useQuiosco();
  // console.log(modal);
  return (

  <>
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-scroll p-3 bg-gray-100">
        <Outlet />
      </main>
      <Resumen />
    </div>

    {
      /* Si modal es true entonces retorna el componente Modal */
    }
   
      <Modal
        isOpen={modal}
        style={customStyles}
      >
        <ModalProducto />
      </Modal>
    <ToastContainer />
  </>
  );

}
