import BlogPost from './BlogPost';
import {useGlobalContext} from './GlobalContextProvider';
import MainPage from './MainPage';
import ROUTES from './routes';
import createTheme from './theme';
import {ThemeProvider} from '@mui/material/styles';
import React from 'react';
import {Helmet} from 'react-helmet-async';
import {
	Switch,
	Route,
	useLocation,
	useHistory,
} from 'react-router-dom';

export default function App() {
	const {env, posts, redirects} = useGlobalContext();
	const location = useLocation();
	const history = useHistory();

	const blogRoutes = React.useMemo(() => {
		const routes = posts.map(({name, route}) => route.replace(name, ':name'));
		return routes.filter((value, index) => routes.indexOf(value) === index);
	}, [posts]);

	React.useEffect(() => {
		const to = redirects.get(location.pathname);
		if (to) {
			history.replace(to);
		}
	}, [posts, history, location.pathname, redirects]);

	if (redirects.get(location.pathname)) {
		return null;
	}

	const theme = createTheme({
		color: env.THEME_COLOR,
		background: env.BG_COLOR,
	});

	return (
		<ThemeProvider theme={theme}>
			<Helmet>
				<title>{env.TITLE}</title>
			</Helmet>
			<Switch>
				<Route path={blogRoutes} exact>
					<BlogPost />
				</Route>
				<Route path={[ROUTES.home, ROUTES.page]} exact>
					<MainPage />
				</Route>
			</Switch>
		</ThemeProvider>
	);
}
