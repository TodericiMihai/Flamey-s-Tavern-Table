import { useEffect, useState } from 'react';


function Login() {

    document.title = "Flamey's Tavern Table - Login";

    //dont ask users to login if they are already logged in
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            document.location = "/";
        }
    });
    
    return (
     <section className='login-page-wrapper page'>
        <div className ='login-page'>
            <header>
                <h1>Login to Flamey's Tavern Table</h1>
            </header>
            <p className='message'> </p>
            <form action ='#' className='login' onSubmit={loginHandler}>

                <label htmlFor ="email">Email: </label>
                <input type="email" id="email" name="Email" required />
                <br />
                
                <label htmlFor ="password">Password: </label>
                <input type="password" id="password" name="Password" required />
                <br />

                <br />
                <input type="checkbox" name="Remember" id="remember-me" /> 
                <label htmlFor="remember-me">Remember Me</label>
                
                <br />
                
                <input type="submit" value="Login" className="login btn"/>
            </form>
        </div>
     </section>
    );
    
    async function loginHandler(e) {
        e.preventDefault();
        const _form = e.target, submitter = document.querySelector("input[type='submit']")

        const formData = new FormData(_form,submitter), dataToSend = {}
        
        for(const [key, value] of formData){
            dataToSend[key] = value
        }
        
        if(dataToSend.Remember==='on'){
            dataToSend.Remember = true
        }

        const response = await fetch('api/FlameyTT/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            }
        })

        const data = await response.json()

        if(response.ok){
            localStorage.setItem('user', dataToSend.Email)
            document.location = "/"
        }

        const messageElem = document.querySelector('.message')

        if(data.message){
            messageElem.innerHTML = data.message
        } else {
            messageElem.innerHTML = "An unexpected error occurred. Please try again."
        }

        console.log('Login error:', data);
    }    
}

export default Login;