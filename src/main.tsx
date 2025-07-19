import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ERROR_MESSAGES } from './utils/constants';

const container = document.getElementById('root');
if (!container) throw new Error(ERROR_MESSAGES.ROOT_NOT_FOUND);

createRoot(container).render(<App />);
