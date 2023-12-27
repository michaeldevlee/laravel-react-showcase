import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashBoardPage = () => {

    const [customers , setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(()=>{
        fetchCustomers()
    },[])


    const token = localStorage.getItem("token");

    const fetchCustomers = async () => {
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

        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers' , options)
        const data = await response.json();
        if (data){
            setCustomers(data.data)
            console.log(data.data);
        }

    }



    const deleteCustomer = async (customer_id) =>{
        const options = {
            method : 'DELETE',
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
        if (response.ok){
            window.location.reload(false)
            
        }
    }

    const deleteInvoice = async (customer_id, invoice_id) => {
        const options = {
            method : 'DELETE',
            credentials: 'include',
            withCredentials : true,
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization' : 'Bearer ' + token
            },
        }
        const response = await fetch (process.env.REACT_APP_BASE_URL+ '/api/v1/customers/' + customer_id + "/invoices/" + invoice_id, options)
        if (response.ok){
            window.location.reload(false)
            
        }
    }

    const handleViewInvoiceClick = (e) =>{
        console.log(e);
    }


    const InvoicesView = () => {
        return (
            <section className="dashboard-section">
                <h2>Invoices</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                selectedCustomer ? selectedCustomer.invoices.map((invoice, index)=>(
                                        <tr key={invoice.id}>
                                            <td>{invoice.id}</td>
                                            <td>{invoice.title}</td>
                                            <td>{invoice.description}</td>
                                            <td>{invoice.cost}</td>
                                            <td ><button id="edit-button" className="dashboard-button"><Link 
                                            to={"/customers/" + selectedCustomer.id + "/invoices/" + invoice.id + '/edit'}
                                            state={{customer : selectedCustomer}}
                                                >Edit</Link></button></td>
                                            <td><button id="delete-button" className="dashboard-button" onClick={() => deleteInvoice(selectedCustomer.id, invoice.id)}>Delete</button></td>
                                        </tr>
                                )) : null
                            }

                    </tbody>
                </table>
                {
                selectedCustomer ? 
                <button id="create-button" className="dashboard-button"><Link 
                to={'/customers/' + selectedCustomer.id+ '/invoices/create'}
                state={{customer : selectedCustomer}}>
                    Create</Link></button> : null
                    }
            </section>
        )
    }

    const CustomersView = ()=>{
        return (
            <section className="dashboard-section">
                <h2>Customers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Industry</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers ? customers.map((customer, index)=>(
                        <tr onClick={()=>setSelectedCustomer(customer)} key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.industry}</td>
                            <td><button id="edit-button" className="dashboard-button"><Link to={"/customers/" + customer.id + "/edit/"} state={{customer_id : customer.id}}>Edit</Link></button></td>
                            <td><button id="delete-button" className="dashboard-button" onClick={() => deleteCustomer(customer.id)}>Delete</button></td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>
                <button id="create-button" className="dashboard-button"><Link to='/customers/create'>Create</Link></button>
            </section>
        )
    }

    return (<div>
        <h1>DASHBOARD</h1>
        <CustomersView/>
        <InvoicesView/>
        
    </div>);
}
 
export default DashBoardPage;