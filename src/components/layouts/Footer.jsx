import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { Headset, Info, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-72 bg-gray-900 border-l border-gray-800 p-6 flex flex-col justify-between text-sm text-gray-400 h-screen">
      {/* Top: Title + Sections */}
      <div className="flex flex-col flex-grow justify-start space-y-10">
        <div className="text-xl font-bold text-white">Sharing stories that matter</div>

        <div>
          {/* Company */}
          <div>
            <h1 className="text-lg  text-gray-300 font-semibold mb-3 flex items-center gap-2">
              {" "}
              <Info size={18} /> Company
            </h1>
            <ul className="flex flex-col gap-2">
              <li>
                <Link className=" hover:text-indigo-400" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg text-gray-300 font-semibold mb-3 mt-3 flex items-center gap-2">
              {" "}
              <Headset size={18} />
              Support
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Help
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h4 className="text-lg text-gray-300 font-semibold mb-3 mt-3  flex items-center gap-2">
              <FileText size={18} />
              Legals
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-indigo-400" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex flex-col items-start gap-4 mt-6">
            <Logo width="100px" />
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} YourBlog. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
// export default function Footer() {
//   return (
//     <footer className="w-72 bg-gray-900 border-l border-gray-800 p-6 flex flex-col gap-8 text-sm text-gray-400 h-screen">
//       <div className="text-xl font-bold text-white">YourBlog</div>

//       <div>
//         <h4 className="text-gray-300 font-semibold mb-2">Company</h4>
//         <ul className="flex flex-col gap-1">
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Features
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Pricing
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Press Kit
//             </a>
//           </li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="text-gray-300 font-semibold mb-2">Support</h4>
//         <ul className="flex flex-col gap-1">
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Account
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Help
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="text-gray-300 font-semibold mb-2">Legals</h4>
//         <ul className="flex flex-col gap-1">
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Terms
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-indigo-400">
//               Privacy
//             </a>
//           </li>
//         </ul>
//       </div>

//       <p className="text-xs text-gray-500 mt-6">
//         © 2023 YourBlog. All Rights Reserved.
//       </p>
//     </footer>
//   );
// }
