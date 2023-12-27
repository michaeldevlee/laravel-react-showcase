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
            return <li><a onClick={handleLogOut}>logout</a></li>
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
        window.location.reload(false)

    }

    return ( <nav className="navbar">
        <div>
            <ul className="navbar-list">
                <section className="navbar-left">
                    <li><Link style={{ textDecoration:'none', color: 'black' }} to="/">Home</Link></li>
                    {token ? null : <li><Link style={{ textDecoration:'none', color: 'black'  }} to="/login">Login</Link> </li>}
                    {token ? <li><Link style={{ textDecoration:'none' }} to="/dashboard">Dashboard</Link> </li> : null}
                </section>
                
                <section className="navbar-right">
                    <LogOutButton isLoggedIn={isLoggedIn()}/>
                </section>
            </ul>
        </div>
    </nav> );
}
 
export default Navbar;