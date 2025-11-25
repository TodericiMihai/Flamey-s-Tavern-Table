import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    document.title = "Flamey's Tavern Table - Register";

    useEffect(() => {
        if (localStorage.getItem('user')) navigate("/");
    }, [navigate]);
    
    return (
     <section className='page-container'>
        <div className='auth-form'>
            <header><h1>Join the Party</h1></header>
            <p className='message'></p>
            <form onSubmit={registerHandler}>
                <label htmlFor="name">Hero Name</label>
                <input type="text" id="name" name="Name" required placeholder="Thorgar Ironfist" />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="Email" required placeholder="hero@tavern.com" />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="PasswordHash" required placeholder="••••••••" />
                
                <input type="submit" value="Sign Up" className="btn"/>
            </form>
            <div className='auth-links'>
                <span>Already a member?</span><a href="/login">Log In</a>
            </div>
        </div>
     </section>
    );

    async function registerHandler(e) {
        e.preventDefault();
        console.log("Register clicked");
    }    
}
export default Register;