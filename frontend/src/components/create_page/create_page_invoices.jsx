import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreatePageInvoices = () => {

    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id
    const { customer_id }= useParams();
    const navigate = useNavigate()

    const [customerName, setCustomerName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    
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

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers/' + customer_id , options)
        const data = await response.json();
        if (data){
            setCustomerName(data.data.firstName + " " + data.data.lastName)
        }
        else{
            
            navigate('/dashboard', {replace : true})
            window.location.reload(false)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            body : JSON.stringify({
                title: title,
                description: description,
                cost: cost,
                customers_id : customer_id
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization' : 'Bearer ' + token
            },

        }

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers/' + customer_id + '/invoices', options)
        const data = await response.json();
        if (response.ok){
            navigate('/dashboard', {replace : true})
            window.location.reload(false)
        }
    }

    const handleExit = ()=>{
        navigate("/dashboard", {replace : true})
        window.location.reload(false)
    }

    return ( <div>
        <h1>Create Invoice</h1>
        <form className="form resource-form" onSubmit={handleSubmit}>
        <div className="form-input form-item">
            <label htmlFor="customer-name">customer name</label>
            <input onChange={(e)=>{setCustomerName(e.target.value)}} disabled value={customerName} type="text" id="customer-name" name="customer-name" required/>
        </div>
        <div className="form-input form-item">
            <label htmlFor="title">title</label>
            <input onChange={(e)=>{setTitle(e.target.value)}} type="text" id="first-name" name="first-name" required/>
        </div>
        <div className="form-input form-item">
            <label htmlFor="description">description</label>
            <input onChange={(e)=>{setDescription(e.target.value)}} type="text" id="last-name" name="last-name" required/>
        </div>
        <div className="form-input form-item">
            <label htmlFor="cost">cost</label>
            <input onChange={(e)=>{setCost(e.target.value)}} type="text" id="address" name="address" required/>
        </div>
        <div className="resource-button-pairs">
            <button type="submit" className="dashboard-button create-button">Create</button>
            <button className="dashboard-button delete-button" onClick={()=>handleExit()}>Cancel</button>
        </div>

        </form>
        
    </div>);
}
 
export default CreatePageInvoices;