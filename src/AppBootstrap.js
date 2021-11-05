import ErrorBoundary from './ErrorBoundary';
import ErrorPage from './ErrorPage';
import GlobalContextProvider from './GlobalContextProvider';
import createTheme from './theme';
import {ThemeProvider} from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import {BrowserRouter as Router} from 'react-router-dom';

export default function AppBootstrap({children}) {
	const author = ENV.AUTHOR;
	const name = ENV.NAME;
	const title = ENV.TITLE;
	const keywords = ENV.KEYWORDS;
	const description = ENV.DESCRIPTION;
	const basePath = ENV.APP_BASE_PATH;

	const theme = createTheme({
		color: ENV.THEME_COLOR,
		background: ENV.BG_COLOR,
	});

	return (
		<GlobalContextProvider
			author={author}
			name={name}
			title={title}
			keywords={keywords}
			description={description}
			basePath={basePath}
			posts={POSTS}
			redirects={new Map(REDIRECTS)}
		>
			<HelmetProvider>
				<ThemeProvider theme={theme}>
					<Router basename={basePath}>
						<ErrorBoundary fallback={<ErrorPage />}>
							<Helmet>
								<title>{ENV.TITLE}</title>
							</Helmet>
							{children}
						</ErrorBoundary>
					</Router>
				</ThemeProvider>
			</HelmetProvider>
		</GlobalContextProvider>
	);
}

AppBootstrap.propTypes = {
	children: PropTypes.node.isRequired,
};
