import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            body : JSON.stringify({
                userName : userName,
                password : password,
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        // const response = await fetch ('localhost'+ '/login' , options)
        // const data = await response.json();
        // if (data.user){
        //     localStorage.setItem('user', JSON.stringify(data))
        //     window.location.reload(false);
        // }
    }
    
    return ( 
    
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username"/>
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="text" id="password" name="password"/>
        </div>
        <button type="submit" className="login-button">LOGIN</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p> 
    </div>
    );
   
}
 
export default LoginPage;