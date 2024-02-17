import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
    // Instanciar middleware de admin
    useAuth({middleware: 'admin'});
  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-scroll p-3 bg-gray-100">
        <Outlet />
      </main>
      
      
    </div>
  )
}
