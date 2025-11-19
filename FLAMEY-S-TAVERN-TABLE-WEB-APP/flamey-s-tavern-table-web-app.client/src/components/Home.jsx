import { useEffect, useState } from 'react';
import CreateCampaignModal from './CreateCampaignModal.jsx';
import CopyButton from './CopyButton';


function Home() {

    document.title = "Flamey's Tavern Table - Home";
    const [userInfo, setUserInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const user = localStorage.getItem('user');
        fetch("api/FlameyTT/home/" + user, {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            setUserInfo(data.userInfo);//userInfo name must be the same as in backend
            console.log('Home page user info:', data.userInfo);
        }).catch(error => {
            console.log('Error home page:', error);
        });
    }, []);

    // ⬅ This gets called after a campaign is created inside the modal
    function handleCampaignCreated(newCampaign) {
        setUserInfo(prev => ({
            ...prev,
            campaigns: [...(prev.campaigns || []), newCampaign]
        }));
    }
    
    return (
     <section className='home-page-wrapper page'>
        <header>
            <h1>Welcome to Flamey's Tavern Table</h1>
        </header>
        {
            userInfo ?
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userInfo.userName}</td>    
                            <td>{userInfo.email}</td>
                            <td>{userInfo.createdDate ? userInfo.createdDate.split(':')[0] : ''}</td>
                        </tr>
                    </tbody>
                </table>
                  <br />


                    {/* Create Campaign Button */}
                    <button onClick={() => setIsModalOpen(true)}>
                        + Create New Campaign
                    </button>

                    <br /><br />

                    {/* Campaigns Table */}
                    {userInfo.campaigns && userInfo.campaigns.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Description</th>
                                    <th>Join Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo.campaigns.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.name}</td>
                                        <td>{c.description}</td>
                                         <td>
                                            <input
                                                value={c.joinCode}
                                                disabled
                                                type="text"
                                            />
                                        <CopyButton code={c.joinCode} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No campaigns found.</div>
                    )}
            </div> :
            <div className="warning">
                <div>Please log in to access your tavern table features.</div>
            </div>
        }
        
            {/* MODAL — appears only when isModalOpen is true */}
            <CreateCampaignModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCampaignCreated={handleCampaignCreated}
            />
     </section>
    );
    
   
}

export default Home;