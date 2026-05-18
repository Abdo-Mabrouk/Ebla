import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden  p-6">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 ps-6 overflow-y-auto rounded-3xl! [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
