import { Link } from "react-router-dom";


const Navbar = () => {

    const isLoggedIn = () => {
        const token = localStorage.getItem('token')
        return token;
    };

    const handleLogOut = async () =>{
        

        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization' : 'Bearer ' + isLoggedIn()
            },
        }
        const response = await fetch ('http://localhost'+ '/api/logout' , options)
        const data = await response.json();
        localStorage.removeItem('token')

    }

    return ( <nav className="navbar">
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="login">Login</Link> </li>
                <li><button onClick={handleLogOut}>logout</button></li>
            </ul>
        </div>
    </nav> );
}
 
export default Navbar;