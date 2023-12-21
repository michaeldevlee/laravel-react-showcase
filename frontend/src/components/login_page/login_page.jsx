import { useState } from "react";
import {Link, redirect, useNavigate} from "react-router-dom";

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

        const response = await fetch (process.env.REACT_APP_BASE_URL + '/api/login' , options)
        const data = await response.json();
        console.log(data);
        if (data.data.user){
            localStorage.setItem('user', JSON.stringify(data.data.user))
            localStorage.setItem('token', data.data.token)
            navigate('/dashboard', {replace : true})
        }
        else{
            console.log(data.status);
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
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" name="password"/>
        </div>
        <button type="submit" className="login-button">LOGIN</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> 
    </div>
    );
   
}
 
export default LoginPage;