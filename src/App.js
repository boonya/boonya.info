import BlogPost from './BlogPost';
import {useGlobalContext} from './GlobalContextProvider';
import MainPage from './MainPage';
import React from 'react';
import {
	Switch,
	Route,
	useLocation,
	useHistory,
} from 'react-router-dom';

export default function App() {
	const {blog} = useGlobalContext();
	const location = useLocation();
	const history = useHistory();

	const blogRoutes = React.useMemo(() => {
		const routes = blog.map(({name, route}) => route.replace(name, ':name'));
		return routes.filter((value, index) => routes.indexOf(value) === index);
	}, [blog]);

	const redirects = React.useMemo(() => {
		return blog
			.map(({redirectFrom}) => redirectFrom)
			.filter((v) => v && v.length)
			.reduce((acc, redirectFrom) => [...acc, ...redirectFrom], []);
	}, [blog]);

	React.useEffect(() => {
		if (redirects.includes(location.pathname)) {
			const {route} = blog.find(({redirectFrom}) => redirectFrom.includes(location.pathname));
			history.replace(route);
		}
	}, [blog, history, location.pathname, redirects]);

	if (redirects.includes(location.pathname)) {
		return null;
	}

	return (
		<Switch>
			<Route path={blogRoutes}>
				<BlogPost />
			</Route>
			<Route path="/" strict>
				<MainPage />
			</Route>
			<Route>
				404
			</Route>
		</Switch>
	);
}
