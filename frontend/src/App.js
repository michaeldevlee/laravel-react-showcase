import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import HomePage from './components/home_page/home_page';
import LoginPage from './components/login_page/login_page';
import SignUpPage from './components/signup_page/signup_page';
import { useEffect } from 'react';
import DashBoardPage from './components/dashboard_page/dashboard_page';
import CreatePage from './components/create_page/create_page';
import EditPage from './components/edit_page/edit_page';
import CreatePageInvoices from './components/create_page/create_page_invoices';
import EditPageInvoices from './components/edit_page/edit_page_invoices';

function App() {
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if (user){
        console.log('user logged in')
    }
    else{
      console.log('user not logged in');
    }
  },[])

  return (
    <Router>
    <Navbar/>  
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/dashboard' element={user ? <DashBoardPage/> : <LoginPage/>}></Route>
        <Route path='/login' element={user ? <DashBoardPage/> : <LoginPage/>}> </Route>
        <Route path='/signup' element={user ? <DashBoardPage/> : <SignUpPage/>}> </Route>
        <Route path='/customers/:id/edit' element={user ? <EditPage/> : <LoginPage/>}> </Route>
        <Route path='/customers/create' element={user ? <CreatePage/> : <LoginPage/>}> </Route>
        <Route path='/customers/:customer_id/invoices/create' element={user ? <CreatePageInvoices/> : <LoginPage/>}> </Route>
        <Route path='/customers/:customer_id/invoices/:invoice_id/edit' element={user ? <EditPageInvoices/> : <LoginPage/>}> </Route>
      </Routes>
    </div>
    </Router>

  );
}

export default App;
