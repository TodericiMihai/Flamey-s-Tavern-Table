import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Home from './components/Home.jsx';
import Admin from './components/Admin.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
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

        {/* i can add a custome element and customize it further as above */}
        <Route path ='*' element={
            <div>
                <header>
                    <h1>404 - Page Not Found</h1>
                </header>
                <p>
                    <a href="/">Go back to Home Page</a>
                </p>
            </div>
        } />
    </Route>
));
function App() {
    const isLogged = localStorage.getItem('user') 
    return (
     <section >
        <div className="top-nav">
            {
                isLogged ?
                <span className="item-holder">
                    <a href ="/">Home</a>
                    <a href ="/admin">Admin</a>
                    <span>Log Out</span>
                </span>:
                <span className="item-holder">
                    <a href ="/login">Login    </a>
                    <a href ="/register">Register</a>
                </span>
            }
        </div>
        <RouterProvider router={router} />
     </section>
    );
    
   
}

export default App;