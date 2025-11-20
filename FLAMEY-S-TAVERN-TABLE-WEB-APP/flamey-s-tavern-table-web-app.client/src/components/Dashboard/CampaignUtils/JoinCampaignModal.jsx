import React, { useState } from 'react';

function JoinCampaignModal({ isOpen, onClose, onCampaignJoined }) {
    
    const [joinCode, setJoinCode] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default browser form submission behavior
        setIsLoading(true); // Set loading state to true
        setError(null);     // Clear any previous errors

        try {
            const response = await fetch('api/Dashboard/campaign/join', {
                method: 'POST', 
                headers: {   
                    'content-Type': 'application/json', 
                    'Accept': 'application/json' 
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    joinCode: joinCode
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to join campaign');
            }

            const data = await response.json();
            console.log('Campaign joined:', data.player);

            // Call the callback function passed from the parent component
            // to update the parent's state or trigger a data refresh
            onCampaignJoined(data.player); 
            
            // Reset form fields
            setJoinCode('');

            // Close the modal
            onClose();

        } catch (err) {
            console.error('Error joining campaign:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
         
            setIsLoading(false); 
        }
    };

    // If 'isOpen' prop is false, return null, so the component doesn't render anything
    if (!isOpen) {
        return null;
    }

 
    return (
      
        <div /* role="dialog" aria-modal="true" *//*  onClick={onClose} */> 
            {/* The actual modal content container */}
            <div /* onClick={e => e.stopPropagation()} */> 
                <button onClick={onClose}>&times;</button> {/* Close button */}
                <h2>Join a Campaign</h2>
                {/* Display error message if 'error' state is not null */}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="joinCode">Join Code:</label>
                        <input
                            type="text"
                            id="joinCode"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            required // HTML5 validation
                            disabled={isLoading} // Disable input when loading
                        />
                    </div>
                    <div>
                        <button type="button" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Joining...' : 'Join Campaign'} {/* Change text based on loading state */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JoinCampaignModal;