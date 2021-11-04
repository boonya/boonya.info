import BlogPost from './BlogPost';
import {useGlobalContext} from './GlobalContextProvider';
import MainPage from './MainPage';
import ROUTES from './routes';
import React from 'react';
import {
	Switch,
	Route,
	useLocation,
	useHistory,
} from 'react-router-dom';

export default function App() {
	const {posts, redirects} = useGlobalContext();
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

	return (
		<Switch>
			<Route path={blogRoutes} exact>
				<BlogPost />
			</Route>
			<Route path={[ROUTES.home, ROUTES.page]} exact>
				<MainPage />
			</Route>
			<Route>
				404
			</Route>
		</Switch>
	);
}
