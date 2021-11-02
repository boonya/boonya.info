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

const blog = BLOG.map(({date, ...rest}) => ({date: new Date(date), ...rest}));
const root = document.getElementById('root');

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<Router>
			<GlobalContextProvider blog={blog}>
				<App />
			</GlobalContextProvider>
		</Router>
	</React.StrictMode>,
	root,
	() => { root.style = 'transition: opacity 1s; opacity: 1'; }
);
