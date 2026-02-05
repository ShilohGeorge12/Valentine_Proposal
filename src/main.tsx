import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<main className="min-h-dvh">
			<App />
		</main>
	</StrictMode>
);
