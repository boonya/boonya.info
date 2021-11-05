import GlobalContextProvider from './GlobalContextProvider';
import createTheme from './theme';
import {ThemeProvider} from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import {BrowserRouter as Router} from 'react-router-dom';

export default function AppBootstrap({children}) {
	const theme = createTheme({
		color: ENV.THEME_COLOR,
		background: ENV.BG_COLOR,
	});

	return (
		<GlobalContextProvider
			env={ENV}
			posts={POSTS}
			redirects={new Map(REDIRECTS)}
		>
			<HelmetProvider>
				<Router>
					<ThemeProvider theme={theme}>
						<Helmet>
							<title>{ENV.TITLE}</title>
						</Helmet>
						{children}
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		</GlobalContextProvider>
	);
}

AppBootstrap.propTypes = {
	children: PropTypes.node.isRequired,
};
