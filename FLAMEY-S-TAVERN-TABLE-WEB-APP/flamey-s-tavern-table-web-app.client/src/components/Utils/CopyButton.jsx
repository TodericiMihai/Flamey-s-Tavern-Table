import { toast } from 'react-toastify';

const CopyButton = ({ code }) => {

  const copyToClipboard = async () => {
    try {
      const copyText = code;
      await navigator.clipboard.writeText(copyText);
      toast.success("Copied to Clipboard");
      
    } catch (err) {
      toast.error("Failed to copy");
      console.error("Copy failed", err);
    }
  };

  return (
    <button 
        onClick={copyToClipboard}
        className="tavern-copy-btn" 
        title="Copy Join Code"
    >
      Copy
    </button>
  );
};

export default CopyButton;