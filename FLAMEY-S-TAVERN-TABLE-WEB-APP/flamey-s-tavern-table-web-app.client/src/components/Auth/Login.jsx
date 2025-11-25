import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    document.title = "Flamey's Tavern Table - Login";

    useEffect(() => {
        if (localStorage.getItem('user')) navigate("/");
    }, [navigate]);
    
    return (
     <section className='page-container'>
        <div className='auth-form'>
            <header><h1>Login</h1></header>
            <p className='message'></p>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="Email" required placeholder="hero@tavern.com"/>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="Password" required placeholder="••••••••" />

                <div className="checkbox-group">
                    <input type="checkbox" name="Remember" id="remember-me" /> 
                    <label htmlFor="remember-me">Remember Me</label>
                </div>
                
                <input type="submit" value="Enter Tavern" className="btn"/>
            </form>
            <div className='auth-links'>
                <span>New here?</span><a href="/register">Create Character</a>
            </div>
        </div>
     </section>
    );

    async function loginHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataToSend = Object.fromEntries(formData.entries());

        // Basic validation logic...
        // Note: This will fail until backend DB is fixed, 
        // but the visual design is what we are fixing now.
        console.log("Attempting login...", dataToSend);
    }    
}
export default Login;