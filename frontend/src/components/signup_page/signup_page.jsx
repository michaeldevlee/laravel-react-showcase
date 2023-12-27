import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [errors, setErrors] = useState(null);

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

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/register' , options)
        const data = await response.json();
        if (response.ok){
            navigate('/login', {replace : true})
        }
        else{
            setErrors(data.errors)
        }
    }
    
    return ( 
    
    <div className="form">
        <h1 >Sign up</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-input form-item">
            <label htmlFor="name">name</label>
            <input onChange={(e)=>{setName(e.target.value)}} required type="text" id="name" name="name"/>
        </div>
        <div className="form-input form-item">
            <label htmlFor="email">email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} required type="email" id="email" name="email"/>
        </div>
        <div className="form-input form-item">
            <label htmlFor="password">password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} required type="password"  id="password" name="password"/>
        </div>
        <div className="form-input form-item">
            <label htmlFor="confirm-password">confirm password</label>
            <input onChange={(e)=>{setConfirmPassword(e.target.value)}} required type="password"  id="confirm-password" name="confirm-password"/>
        </div>
        {errors && errors.email ? <p className="login-error">{errors.email[0]}</p> : null}
        {errors && errors.password ? <p className="login-error">{errors.password[0]}</p> : null}

        <div className="resource-button-pairs"><button type="submit" className="dashboard-button create-button">SIGN UP</button></div>
        </form>
        <p>Already have an account? <Link to="/login">Log in</Link></p> 
    </div>
    );
   
}
 
export default SignUpPage;