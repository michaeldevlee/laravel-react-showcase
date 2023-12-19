import { useEffect } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    let token = localStorage.getItem('token')

    useEffect(()=>{
        token = localStorage.getItem('token')
    })

    const isLoggedIn = () => {
        if (token){
            return true
        }

        return false
    };

    const LogOutButton = ({isLoggedIn}) => {
        if (isLoggedIn){
            return <li><button onClick={handleLogOut}>logout</button></li>
        }
        else{
            return null
        }
    }

    const handleLogOut = async () =>{
        

        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization' : 'Bearer ' + token
            },
        }
        const response = await fetch ('http://localhost'+ '/api/logout' , options)
        const data = await response.json();
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload(false);

    }

    return ( <nav className="navbar">
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="login">Login</Link> </li>
                <LogOutButton isLoggedIn={isLoggedIn()}/>
            </ul>
        </div>
    </nav> );
}
 
export default Navbar;