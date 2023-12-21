import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {

    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [industry, setIndustry] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            body : JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                address: address,
                user_id: user_id,
                email : email,
                industry : industry,
                active : true
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization' : 'Bearer ' + token
            },

        }

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers' , options)
        const data = await response.json();
        if (response.ok){
            navigate('/dashboard', {replace : true})
            window.location.reload(false)
        }
    }

    return ( <div>
        <h1>Create Customer</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="first-name">first name</label>
            <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" id="first-name" name="first-name" required/>
        </div>
        <div>
            <label htmlFor="last-name">last name</label>
            <input onChange={(e)=>{setLastName(e.target.value)}} type="text" id="last-name" name="last-name" required/>
        </div>
        <div>
            <label htmlFor="address">address</label>
            <input onChange={(e)=>{setAddress(e.target.value)}} type="text" id="address" name="address" required/>
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email" required/>
        </div>
        <div>
            <label htmlFor="industry">industry</label>
            <input onChange={(e)=>{setIndustry(e.target.value)}} type="text" id="industry" name="industry" required/>
        </div>
        <button type="submit" className="create-customer-button">Create</button>
        <button><Link to="/dashboard">Cancel</Link></button>

        </form>
        
    </div>);
}
 
export default CreatePage;