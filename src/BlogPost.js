import {useGlobalContext} from './GlobalContextProvider';
import Html from './Html';
import React from 'react';
import {useParams} from 'react-router-dom';

export default function BlogPost() {
	const {blog} = useGlobalContext();
	const params = useParams();

	const {filename, title, date, html} = React.useMemo(() => {
		return blog.find((post) => post.name === params.name);
	}, [blog, params.name]);

	return (
		<article id={filename}>
			<h1>{title}</h1>
			<Html content={html} />
			{new Intl.DateTimeFormat('ru-UA').format(date)}
		</article>
	);
}
