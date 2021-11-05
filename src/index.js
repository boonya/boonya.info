import App from './App';
import GlobalContextProvider from './GlobalContextProvider';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<HelmetProvider>
			<Router>
				<GlobalContextProvider
					env={ENV}
					posts={POSTS}
					redirects={new Map(REDIRECTS)}
				>
					<App />
				</GlobalContextProvider>
			</Router>
		</HelmetProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
