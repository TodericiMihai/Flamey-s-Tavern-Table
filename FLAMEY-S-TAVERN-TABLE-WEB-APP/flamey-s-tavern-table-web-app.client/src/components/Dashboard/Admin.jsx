import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();
    document.title = "Flamey's Tavern Table - Admin";
    
    // 1. MOCK DATA (Fake list so we can see the design)
    const [partners, setPartners] = useState([
        "Wizards of the Coast",
        "D&D Beyond",
        "Critical Role",
        "The Tavern Keepers Guild"
    ]);

    useEffect(() => {
        // We skip the fetch for now since the backend isn't ready.
        // If not logged in (Traveler ticket missing), go to login.
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
    }, [navigate]);
    
    return (
     <div className="dashboard"> {/* Use the same container as Home */}
        <header style={{borderBottom: '1px solid #444', paddingBottom:'1rem', marginBottom:'2rem'}}>
            <h1 style={{color:'#f1c40f'}}>Admin Chamber</h1>
            <p style={{color:'#a0a0a0'}}>Manage the tavern's trusted allies.</p>
        </header>

       <section>
            <h2 className="section-title">Trusted Partners</h2>
            
            {/* Display Partners in Cards */}
            <div className="grid-container">
                {partners.length > 0 ? (
                    partners.map((partner, index) => (
                        <div key={index} className="card">
                            <h3>🤝 {partner}</h3>
                            <p>Status: <span style={{color:'#2ecc71', fontWeight:'bold'}}>Active</span></p>
                            <button className="btn" style={{marginTop:'10px'}}>Manage Access</button>
                        </div>
                    ))
                ) : (
                    <div className="card">
                        <p>No partners found in the archives.</p>
                    </div>
                )}
            </div>
       </section>
     </div>
    );
}

export default Admin;