import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const EditPageInvoices = () => {

    let { state } = useLocation()

    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id
    const { customer_id, invoice_id, customer }= useParams();
    const navigate = useNavigate()

    const [customerName, setCustomerName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    
    useEffect(()=>{
        fetchInvoice()
    },[])


    const fetchInvoice = async () => {
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

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers/' + customer_id + '/invoices/' + invoice_id , options)
        const data = await response.json();

        if (data){
            const customer = state.customer
            const invoice = data.data
            setCustomerName(customer.firstName + " " + customer.lastName)
            setTitle(invoice.title)
            setDescription(invoice.description)
            setCost(invoice.cost)
        }
        else{
            
            navigate('/dashboard', {replace : true})
            window.location.reload(false)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'PATCH',
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

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers/' + customer_id + '/invoices/' + invoice_id, options)
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
        <form onSubmit={handleSubmit}>
        <select name="customer-select" id="customer-select"></select>
        <div>
            <label htmlFor="customer-name">customer name</label>
            <input onChange={(e)=>{setCustomerName(e.target.value)}} disabled value={customerName} type="text" id="customer-name" name="customer-name" required/>
        </div>
        <div>
            <label htmlFor="title">title</label>
            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" id="first-name" name="first-name" required/>
        </div>
        <div>
            <label htmlFor="description">description</label>
            <input onChange={(e)=>{setDescription(e.target.value)}} value={description} type="text" id="last-name" name="last-name" required/>
        </div>
        <div>
            <label htmlFor="cost">cost</label>
            <input onChange={(e)=>{setCost(e.target.value)}} value={cost} type="text" id="address" name="address" required/>
        </div>
        <button type="submit" className="create-customer-button">Confirm</button>
        <button onClick={()=>handleExit()}>Cancel</button>

        </form>
        
    </div>);
}
 
export default EditPageInvoices;