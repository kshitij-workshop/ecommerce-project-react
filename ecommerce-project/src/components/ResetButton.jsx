import axios from 'axios';
import './reset-button.css';

export function ResetButton({ loadCart }) {
  const handleReset = async () => {
    try {
      await axios.post('/api/reset');
      if (loadCart) await loadCart();
      // small delay to ensure backend finished resetting
      setTimeout(() => window.location.reload(), 200);
    } catch (err) {
      console.error('Reset failed', err);
    }
  };

  return (
    <button
      className="reset-button-fixed"
      onClick={handleReset}
      aria-label="Reset application data"
      title="Reset application data"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="reset-button-label">Reset</span>
    </button>
  );
}

export default ResetButton;
