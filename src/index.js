import App from './App';
import AppBootstrap from './AppBootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<React.StrictMode>
		<AppBootstrap>
			<App />
		</AppBootstrap>
	</React.StrictMode>,
	document.getElementById('root'),
);
