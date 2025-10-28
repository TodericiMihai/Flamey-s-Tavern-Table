import { useEffect, useState } from 'react';


function Register() {

    document.title = "Flamey's Tavern Table - Register";

    //dont ask users to register if they are already registered
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            document.location = "/";
        }
    });
    
    return (
     <section className='register-page-wrapper page'>
        <div className ='register-page'>
            <header>
                <h1>Register for Flamey's Tavern Table</h1>
            </header>
            <p className='message'> </p>
            <form action ='#' className='register' onSubmit={registerHandler}>

                <label htmlFor ="name">Name: </label>
                <input type="text" id="name" name="name" required />
                <br />

                <label htmlFor ="email">Email: </label>
                <input type="email" id="email" name="email" required />
                <br />
                
                <label htmlFor ="password">Password: </label>
                <input type="password" id="password" name="password" required />
                <br />
                
                <br />
                <input type="submit" value="Register" className="register btn"/>
            </form>
        </div>
     </section>
    );
    
    async function registerHandler(e) {
        e.preventDefault();
        const _form = e.target, submitter = document.querySelector("input[type='submit']")

        const formData = new FormData(_form,submitter), dataToSend = {}
        
        for(const [key, value] of formData){
            dataToSend[key] = value
        }
        
        //create username

        const newUserName = dataToSend.name.trim().split("")
        dataToSend.UserName= newUserName.join("")

        const response = await fetch('api/FlameyTT/register', {
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
            document.location = "/login"
        }

        const messageElem = document.querySelector('.message')

        if(data.message){
            messageElem.innerHTML = data.message
        } else {
            let errorMessage = "<div> Attention please </div><div class='normal'>"
            data.errors.forEach(err => {
                errorMessage +=  err.description + " "
            })
            errorMessage += "</div>"

            messageElem.innerHTML = errorMessage
        }

        console.log('Register error:', data);
    }    
}

export default Register;