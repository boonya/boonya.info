import {useGlobalContext} from './GlobalContextProvider';
import Html from './Html';
import React from 'react';
import {NavLink} from 'react-router-dom';

export default function MainPage() {
	const {blog} = useGlobalContext();

	const items = React.useMemo(() => {
		return blog.map(({filename, route, title, date, html}) => {
			const short = html.split(/<!--\s*more\s*-->/um)[0];
			return (
				<article key={filename} id={filename}>
					<NavLink to={route}><h1>{title}</h1></NavLink>
					<Html content={short} />
					{new Intl.DateTimeFormat('ru-UA').format(date)}
				</article>
			);
		});
	}, [blog]);

	return (
		<div>
			{items}
		</div>
	);
}
