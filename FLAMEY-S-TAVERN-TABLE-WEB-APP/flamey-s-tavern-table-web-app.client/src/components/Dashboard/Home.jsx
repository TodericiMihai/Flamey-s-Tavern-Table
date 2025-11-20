import { useEffect, useState } from 'react';
import CreateCampaignModal from './CampaignUtils/CreateCampaignModal.jsx';
import CopyButton from '../Utils/CopyButton.jsx';
import DeleteCampaignModal from './CampaignUtils/DeleteCampaignModal.jsx';
import JoinCampaignModal from './CampaignUtils/JoinCampaignModal.jsx';


function Home() {

    document.title = "Flamey's Tavern Table - Home";
    const [userInfo, setUserInfo] = useState({});
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [campaignToDelete, setCampaignToDelete] = useState(null);



    useEffect(() => {
        const user = localStorage.getItem('user');
        fetch("api/Dashboard/home/" + user, {
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

    function handleCampaignDeleted(deletedCampaignId) {
        setUserInfo(prev => ({
            ...prev,
            campaigns: prev.campaigns.filter(c => c.id !== deletedCampaignId)
        }));
    }

    function handleCampaignJoined(newCharacter) {
        setUserInfo(prev => ({
            ...prev,
            characters: [...(prev.characters || []), newCharacter]
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
                    <button onClick={() => setIsCreateModalOpen(true)}>
                        + Create New Campaign
                    </button>
                    
                    <button onClick={() => setIsJoinModalOpen(true)}>
                        + Join Campaign
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
                                        <button onClick={() => {
                                            setCampaignToDelete(c); 
                                            setIsDeleteModalOpen(true); 
                                        }}>
                                            Delete this Campaign
                                        </button>
                                        
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No campaigns found.</div>
                    )}
                    {/* Characters Table */}
                    {userInfo.characters && userInfo.characters.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Character Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo.characters.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No characters found.</div>
                    )}
            </div> :
            <div className="warning">
                <div>Please log in to access your tavern table features.</div>
            </div>
        }
        
            {/* MODAL — appears only when isCreateModalOpen is true */}
            {isCreateModalOpen && (
                <CreateCampaignModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCampaignCreated={handleCampaignCreated}
                />
            )}
            {isDeleteModalOpen && campaignToDelete && (
                <DeleteCampaignModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onCampaignDeleted={(id) => {
                        handleCampaignDeleted(id);
                        setCampaignToDelete(null);
                    }}
                    campaign={campaignToDelete}
                />
            )}
            {isJoinModalOpen && (
                <JoinCampaignModal 
                    isOpen={isJoinModalOpen}
                    onClose={() => setIsJoinModalOpen(false)}
                    onCampaignJoined={handleCampaignJoined}
                />
            )}
     </section>
    );
    
   
}

export default Home;