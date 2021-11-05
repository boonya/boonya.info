import App from './App';
import AppBootstrap from './AppBootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<AppBootstrap>
			<App />
		</AppBootstrap>
	</React.StrictMode>,
	document.getElementById('root'),
);
