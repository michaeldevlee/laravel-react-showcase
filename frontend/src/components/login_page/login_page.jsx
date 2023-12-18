import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            body : JSON.stringify({
                email : email,
                password : password,
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        const response = await fetch ('http://localhost'+ '/api/login' , options)
        const data = await response.json();
        console.log(data.data.token);
        if (data.data){
            localStorage.setItem('token', data.data.token)
        }
    }
    
    return ( 
    
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email"/>
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="text" id="password" name="password"/>
        </div>
        <button type="submit" className="login-button">LOGIN</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> 
    </div>
    );
   
}
 
export default LoginPage;