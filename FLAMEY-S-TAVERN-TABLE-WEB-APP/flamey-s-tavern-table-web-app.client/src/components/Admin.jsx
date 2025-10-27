import { useEffect, useState } from 'react';


function Admin() {

    document.title = "Flamey's Tavern Table - Admin";
    const [partners, setPartners] = useState([]);

    useEffect(() => {

        fetch("api/FlameysTavernTable/admin", {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            setPartners(data.trustedParteners);
            console.log('Admin page partners:', data.trustedParteners);
        }).catch(error => {
            console.log('Error admin page:', error);
        });
    }, []);
    
    return (
     <section classsName="admin-page-wrapper page">
        <header>
            <h1>Welcome to Flamey's Tavern Table Admin</h1>
        </header>
       <section>
        {
             partners ?
                <div>
                    <div> Our trusted partners:</div>
                    <ol>
                        {partners.map((partner, index) => (
                            <li key={index}>{partner}</li>
                        ))}
                    </ol>
                </div>
            :
                <div className="waiting-page">
                    <div>Waiting...</div>
                </div>
        }
           
       </section>
     </section>
    );
    
   
}

export default Admin;