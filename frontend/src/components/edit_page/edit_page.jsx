import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPage = () => {
    const { id }= useParams();
    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id
    const navigate = useNavigate()
    

    const [customer, setCustomer] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [industry, setIndustry] = useState('')

    useEffect(()=>{
        fetchCustomer()
    },[])

    const fetchCustomer = async () => {
        const options = {
            method : 'GET',
            credentials: 'include',
            withCredentials : true,
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization' : 'Bearer ' + token
            },

        }

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers/' + id , options)
        const data = await response.json();
        if (data.data){
            const customer_data = data.data
            setCustomer(customer_data)
            setFirstName(customer_data.firstName)
            setLastName(customer_data.lastName)
            setEmail(customer_data.email)
            setAddress(customer_data.address)
            setIndustry(customer_data.industry)
        }
        else{
            
            navigate('/dashboard', {replace : true})
        }

    }

    const patchCustomer = async (e) => {
        e.preventDefault()
        const options = {
            method : 'PATCH',
            credentials: 'include',
            withCredentials : true,
            body:JSON.stringify({
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

        const response = await fetch (process.env.REACT_APP_BASE_URL + '/api/v1/customers/' + id , options)
        const data = await response.json();
        if (response.ok){
            navigate("/dashboard", {replace : true})
        }
    }

    return ( <div>
        <h1>Edit</h1>
        <form onSubmit={patchCustomer}>
        <div>
            <label htmlFor="first-name">first name</label>
            <input onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} type="text" id="first-name" name="first-name" required/>
        </div>
        <div>
            <label htmlFor="last-name">last name</label>
            <input onChange={(e)=>{setLastName(e.target.value)}} value={lastName} type="text" id="last-name" name="last-name" required/>
        </div>
        <div>
            <label htmlFor="address">address</label>
            <input onChange={(e)=>{setAddress(e.target.value)}} value={address} type="text" id="address" name="address" required/>
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" id="email" name="email" required/>
        </div>
        <div>
            <label htmlFor="industry">industry</label>
            <input onChange={(e)=>{setIndustry(e.target.value)}} value={industry} type="text" id="industry" name="industry" required/>
        </div>
        <button type="submit" className="create-customer-button">Confirm</button>
        <button><Link to="/dashboard">Cancel</Link></button>

        </form>
    </div> );
}
 
export default EditPage;