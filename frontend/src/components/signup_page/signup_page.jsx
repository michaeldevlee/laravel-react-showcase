import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            body : JSON.stringify({
                name: name,
                email : email,
                password : password,
                password_confirmation : confirmPassword
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        const response = await fetch ('http://localhost'+ '/api/register' , options)
        const data = await response.json();
        console.log(data);
        // if (data.user){
        //     localStorage.setItem('user', JSON.stringify(data))
        //     window.location.reload(false);
        // }
    }
    
    return ( 
    
    <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">name</label>
            <input onChange={(e)=>{setName(e.target.value)}} type="text" id="name" name="name"/>
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email"/>
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="text" id="password" name="password"/>
        </div>
        <div>
            <label htmlFor="confirm-password">confirm password</label>
            <input onChange={(e)=>{setConfirmPassword(e.target.value)}} type="text" id="confirm-password" name="confirm-password"/>
        </div>
        <button type="submit" className="signup-button">SIGN UP</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in</Link></p> 
    </div>
    );
   
}
 
export default SignUpPage;