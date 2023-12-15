import { Link } from "react-router-dom";


const Navbar = () => {
    return ( <nav className="navbar">
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="login">Login</Link> </li>
            </ul>
        </div>
    </nav> );
}
 
export default Navbar;