import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import MainPageLayout from './Layout/MainPage';
import React from 'react';

export default function MainPage() {
	const {blog} = useGlobalContext();

	const items = React.useMemo(() => {
		return blog.map(({filename, route, title, date, html}) => {
			const short = html.split(/<!--\s*more\s*-->/um)[0];
			return (
				<Article
					key={filename}
					id={filename}
					link={route}
					title={title}
					date={date}
				>
					{short}
				</Article>
			);
		});
	}, [blog]);

	return (
		<MainPageLayout>
			{items}
		</MainPageLayout>
	);
}
