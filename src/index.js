import App from './App';
import GlobalContextProvider from './GlobalContextProvider';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<Router>
			<GlobalContextProvider
				env={ENV}
				posts={POSTS}
				redirects={new Map(REDIRECTS)}
			>
				<App />
			</GlobalContextProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
