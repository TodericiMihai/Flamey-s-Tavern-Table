import React, { useState } from 'react';

function DeleteCampaignModal({ isOpen, onClose, campaign, onCampaignDeleted }) {
    const [confirmName, setConfirmName] = useState(""); 
    const [showFinalConfirm, setShowFinalConfirm] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleInitialConfirm = (e) => {
        e.preventDefault();
        setError(null);

        if (confirmName.trim() !== campaign.name) {
            setError("The campaign name does not match. Please type it exactly.");
            return;
        }

        setShowFinalConfirm(true); // Show final yes/no confirmation
    };

    const handleDelete = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('api/Dashboard/campaign/delete', {
                method: 'POST',
                headers: {   
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    CampaignToDeleteId: campaign.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete campaign');
            }

            const data = await response.json();
            console.log('Campaign deleted:', data);

            onCampaignDeleted(campaign.id); // update parent state
            setConfirmName("");
            setShowFinalConfirm(false);
            onClose();

        } catch (err) {
            console.error('Error deleting campaign:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>&times;</button>

                {!showFinalConfirm ? (
                    <>
                        <h2>Confirm Deletion</h2>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <p>Please type the campaign name to confirm deletion:</p>
                        <form onSubmit={handleInitialConfirm}>
                            <input
                                type="text"
                                value={confirmName}
                                onChange={(e) => setConfirmName(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
                                <button type="submit" disabled={isLoading}>Confirm Name</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Are you really sure?</h2>
                        <p>This action is irreversible!</p>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className="modal-buttons">
                            <button onClick={() => setShowFinalConfirm(false)} disabled={isLoading}>Go Back</button>
                            <button onClick={handleDelete} disabled={isLoading}>
                                {isLoading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DeleteCampaignModal;
