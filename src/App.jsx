import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./services/AuthService";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Footer from "./components/layouts/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="flex min-h-screen bg-slate-950 text-gray-100">
      {/* Left Sidebar */}
      <aside className="w-20 md:w-64 sticky top-0 h-screen bg-slate-900 border-r border-slate-800">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Right Sidebar / Footer */}
      <aside className="hidden lg:block w-64 sticky top-0 h-screen bg-slate-900 border-l border-slate-800">
        <Footer />
      </aside>
    </div>
  ): null;
}

export default App;
