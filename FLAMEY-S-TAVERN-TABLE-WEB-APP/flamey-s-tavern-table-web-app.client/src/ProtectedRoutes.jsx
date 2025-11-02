import {useState, useEffect, use} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

function ProtectedRoutes() {
    const [isLogged, setIsLogged] = useState(false);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        fetch("api/FlameyTT/iahjwevdf", {
            method: 'GET',
            credentials: "include"
        }).then(response => {
            if (response.ok) {
                setWaiting(false);
                setIsLogged(true);
            }
            return response.json()
        }).then(data => {
            localStorage.setItem('user', data.user.email);
            console.log(data.user)
        }).catch(error => {
            console.log('Error checking login status:', error);
            setWaiting(false);
            localStorage.removeItem('user');
        });
    }, []);

    return waiting ? <div className = "waiting-page">
        <div>Loading...</div>
        </div> : 
        isLogged ? <Outlet /> : <Navigate to = "/login" />;
}

export default ProtectedRoutes;