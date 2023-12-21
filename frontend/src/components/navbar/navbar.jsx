import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    const apiURL = process.env.REACT_APP_BASE_URL
    let token = localStorage.getItem('token')
    const navigate = useNavigate();

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
        const response = await fetch (apiURL + '/api/logout' , options)
        const data = await response.json();
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login', {replace : true})

    }

    return ( <nav className="navbar">
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                {token ? null : <li><Link to="/login">Login</Link> </li>}
                {token ? <li><Link to="/dashboard">Dashboard</Link> </li> : null}
                
                <LogOutButton isLoggedIn={isLoggedIn()}/>
            </ul>
        </div>
    </nav> );
}
 
export default Navbar;