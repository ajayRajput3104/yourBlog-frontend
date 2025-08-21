import {
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
  UserPlusIcon,
  PlusCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo, LogoutBtn, LogoCollapse } from "../index.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <ArrowRightStartOnRectangleIcon className="h-6 w-6" />,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: <UserPlusIcon className="h-6 w-6" />,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <WalletIcon className="h-6 w-6" />,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <PlusCircleIcon className="h-6 w-6" />,
    },
  ];
  return (
    <aside className="w-full bg-gray-950 border-r border-gray-800 p-6 flex flex-col gap-6 shadow-xl h-screen">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span className="hidden md:block">
          <Logo width="200px" />
        </span>
        <span className="block md:hidden">
          <LogoCollapse width="50px" />
        </span>
      </motion.div>
      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {navItems.map((item) =>
          item.active ? (
            <Link
              key={item.name}
              to={item.slug}
              className="flex items-center gap-3 px-3 py-2 rounded-lg  text-gray-300  hover:bg-gray-800 hover:text-indigo-400 transition justify-center md:justify-start"
            >
              {item.icon && (
                <div className="flex items-center  h-10 w-10">
                  {item.icon}
                </div>
              )}
              <span className="hidden md:inline ml-3">{item.name}</span>
            </Link>
          ) : null
        )}
        {authStatus && <LogoutBtn />}
      </nav>
    </aside>
  );
}
