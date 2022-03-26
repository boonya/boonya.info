import BlogPost from './BlogPost';
import {useGlobalContext} from './GlobalContextProvider';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';
import React, {useMemo} from 'react';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';

export default function App() {
	const {redirects} = useGlobalContext();
	const location = useLocation();

	const redirectTo = useMemo(() => {
		return redirects.get(location.pathname);
	}, [redirects, location.pathname]);

	if (redirectTo) {
		return <Navigate to={redirectTo} replace />;
	}

	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/blog/:name.html" element={<BlogPost />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
