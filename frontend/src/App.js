import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import HomePage from './components/home_page/home_page';
import LoginPage from './components/login_page/login_page';
import SignUpPage from './components/signup_page/signup_page';
import { useEffect } from 'react';
import DashBoardPage from './components/dashboard_page/dashboard_page';

function App() {
  const user = localStorage.getItem('user')

  useEffect(()=>{
    if (user){
        console.log('user logged in')
    }
    else{
      console.log('user not logged in');
    }
  },[])
  
  const dashboard = <DashBoardPage/>

  return (
    <Router>
    <Navbar/>  
    <div className="App">
      <Routes>
        <Route path='/dashboard' element={user ? dashboard : <LoginPage/>}></Route>
        <Route path='/login' element={user ? dashboard : <LoginPage/>}> </Route>
        <Route path='/signup' element={user ? dashboard : <SignUpPage/>}> </Route>
      </Routes>
    </div>
    </Router>

  );
}

export default App;
