import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState("Traveler");

    // Mock Data for Design Purposes
    const myCharacters = [
        { id: 1, name: "Thorgar", class: "Barbarian", level: 5 },
        { id: 2, name: "Elara", class: "Wizard", level: 3 }
    ];

    const myCampaigns = [
        { id: 1, name: "Curse of Strahd", role: "DM" },
        { id: 2, name: "Lost Mines", role: "Player" }
    ];

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (!loggedUser) {
            navigate('/login');
        } else {
            setUser(loggedUser);
        }
    }, [navigate]);

    return (
        <div className="dashboard">
            <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1>Greetings, {user}.</h1>
                <button className="btn" style={{width:'auto', padding:'0.5rem 2rem'}}>+ Create New</button>
            </header>

            <h2 className="section-title">Your Heroes</h2>
            <div className="grid-container">
                {myCharacters.map(char => (
                    <div key={char.id} className="card">
                        <h3>{char.name}</h3>
                        <p>Level {char.level} {char.class}</p>
                        <button className="btn">View Sheet</button>
                    </div>
                ))}
            </div>

            <h2 className="section-title">Active Campaigns</h2>
            <div className="grid-container">
                {myCampaigns.map(camp => (
                    <div key={camp.id} className="card">
                        <h3>{camp.name}</h3>
                        <p>Role: <strong>{camp.role}</strong></p>
                        <button className="btn">Enter World</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;