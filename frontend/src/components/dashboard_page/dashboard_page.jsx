import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashBoardPage = () => {

    useEffect(()=>{
        fetchCustomers()
    },[])

    const [customers , setCustomers] = useState([]);


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

        const response = await fetch ('http://localhost'+ '/api/v1/customers' , options)
        const data = await response.json();
        if (data.data){
            setCustomers(data.data)
        }

    }

    return (<div>
        <h1>DASHBOARD</h1>
        <h2>Customers</h2>
        <p>{customers.length > 0  ? customers.length : null}</p>
        <h2>Customers List</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Industry</th>
                </tr>
            </thead>

            <tbody>
                {customers.map((customer, index)=>(
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.industry}</td>
                    <td><button onClick={() => console.log(customer.id)}>Edit</button></td>
                    <td><button onClick={() => console.log(customer.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <button><Link to='/create'>Create</Link></button>


    </div>);
}
 
export default DashBoardPage;