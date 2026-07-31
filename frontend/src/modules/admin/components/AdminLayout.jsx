import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#f4f5f7] text-[#1f2937] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-auto bg-[#f4f5f7] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
