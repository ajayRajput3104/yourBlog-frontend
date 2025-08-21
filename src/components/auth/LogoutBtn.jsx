import { useDispatch } from "react-redux";
import authService from "../../services/AuthService";
import { logout } from "../../store/authSlice";
import { motion } from "framer-motion";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#2563eb", color: "#fff" }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={logoutHandler}
      className="flex items-center gap-3 px-2 py-2 rounded-lg text-gray-950 bg-white 
                 hover:bg-gray-800 hover:text-indigo-400 transition
                 justify-center md:justify-start w-full"
    >
      <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
      <span className="hidden md:inline">Logout</span>
    </motion.button>
  );
}

export default LogoutBtn;
