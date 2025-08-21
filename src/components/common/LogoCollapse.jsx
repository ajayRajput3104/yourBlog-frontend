import { Link } from 'react-router-dom'; // optional if you want the logo to be clickable
import logo from "../../assets/logoCollapse.png"

function LogoCollapse({ width = "100px" }) {
  return (
    <Link to="/" className="inline-block">
      <img
        src={logo} // Replace with your actual logo path
        alt="Logo"
        width={width}
        className="object-contain"
      />
    </Link>
  );
}

export default LogoCollapse;
