import { useEffect, useState } from 'react';


function Home() {

    document.title = "Flamey's Tavern Table - Home";
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const user = localStorage.getItem('user');
        fetch("api/FlameysTavernTable/home" + user, {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            setUserInfo(data.userInfo);
            console.log('Home page user info:', data.userInfo);
        }).catch(error => {
            console.log('Error home page:', error);
        });
    }, []);
    
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
                            <td>{userInfo.name}</td>    
                            <td>{userInfo.email}</td>
                            <td>{userInfo.createdDate ? userInfo.createdDate.split(':')[0] : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div> :
            <div className="warning">
                <div>Please log in to access your tavern table features.</div>
            </div>
        }
     </section>
    );
    
   
}

export default Home;