import React, { useState } from 'react';

function CreateCampaignModal({ isOpen, onClose, onCampaignCreated }) {
    
    const [campaignName, setCampaignName] = useState('');
    const [campaignDescription, setCampaignDescription] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default browser form submission behavior
        setIsLoading(true); // Set loading state to true
        setError(null);     // Clear any previous errors

        try {
            const response = await fetch('api/FlameyTT/campaign/create', {
                method: 'POST', 
                headers: {   
                    'content-Type': 'application/json', 
                    'Accept': 'application/json' 
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    name: campaignName,
                    description: campaignDescription,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create campaign');
            }

            const data = await response.json();
            console.log('Campaign created:', data.campaign);

            // Call the callback function passed from the parent component
            // to update the parent's state or trigger a data refresh
            onCampaignCreated(data.campaign); 
            
            // Reset form fields
            setCampaignName('');
            setCampaignDescription('');

            // Close the modal
            onClose();

        } catch (err) {
            console.error('Error creating campaign:', err);
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
                <h2>Create New Campaign</h2>
                {/* Display error message if 'error' state is not null */}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="campaignName">Campaign Name:</label>
                        <input
                            type="text"
                            id="campaignName"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            required // HTML5 validation
                            disabled={isLoading} // Disable input when loading
                        />
                    </div>
                    <div>
                        <label htmlFor="campaignDescription">Description:</label>
                        <textarea
                            id="campaignDescription"
                            value={campaignDescription}
                            onChange={(e) => setCampaignDescription(e.target.value)}
                            rows="4"
                            disabled={isLoading} // Disable textarea when loading
                        ></textarea>
                    </div>
                    <div>
                        <button type="button" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Campaign'} {/* Change text based on loading state */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCampaignModal;