import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export default function Protected({ children }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) {
      navigate("/login", { replace: true });
    }
  }, [authStatus, navigate]);

  return children ? children : <Outlet />;
}
