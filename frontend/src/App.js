import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import HomePage from './components/home_page/home_page';
import LoginPage from './components/login_page/login_page';
import SignUpPage from './components/signup_page/signup_page';

function App() {
  return (
    <Router>
    <Navbar/>  
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/login' element={<LoginPage/>}> </Route>
        <Route path='/signup' element={<SignUpPage/>}> </Route>
      </Routes>
    </div>
    </Router>

  );
}

export default App;
