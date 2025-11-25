import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Home from './components/Dashboard/Home.jsx';
import Admin from './components/Dashboard/Admin.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
        <Route element = {<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path ='/admin' element={<Admin />} />
        </Route>
        <Route path ='/login' element={<Login />} />
        <Route path ='/register' element={<Register />} />

        {/* 404 Page */}
        <Route path ='*' element={
            <div className="page-container">
                <div className="auth-form">
                    <header><h1>404 - Lost in the Void</h1></header>
                    <p style={{textAlign:'center'}}>The page you seek does not exist.</p>
                    <a href="/" className="btn" style={{textAlign:'center', display:'block', textDecoration:'none'}}>Return to Tavern</a>
                </div>
            </div>
        } />
    </Route>
));

function App() {
    const isLogged = localStorage.getItem('user');

    const logout = async () => {
        // Simple logout logic for frontend dev
        localStorage.removeItem('user');
        window.location = "/login"; 
    };

    return (
     <section>
        {/* --- THE NAVBAR --- */}
        <div className="navbar">
            <a href="/" className="brand">🔥 Flamey's Table</a>
            
            {
                isLogged ?
                <span className="item-holder">
                    <a href ="/">Dashboard</a>
                    <a href ="/admin">Admin</a>
                    <span onClick={logout}>Log Out</span>
                </span>:
                <span className="item-holder">
                    <a href ="/login">Login</a>
                    <a href ="/register">Register</a>
                </span>
            }
        </div>

        <RouterProvider router={router} />
     </section>
    );
}

export default App;