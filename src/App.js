import BlogPost from './BlogPost';
import {useGlobalContext} from './GlobalContextProvider';
import MainPage from './MainPage';
import {Grid} from '@mui/material';
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
		<Grid container direction="column" wrap="nowrap" minHeight="100%">
			<Grid item component="header">header</Grid>
			<Grid item container flexGrow={1}>
				<Grid item xs={12} md={8} component="main" id="content">
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
				</Grid>
				<Grid item xs={12} md={4} component="aside">aside</Grid>
			</Grid>
			<Grid item component="footer">footer</Grid>
		</Grid>
	);
}
