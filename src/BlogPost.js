import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import PostLayout from './Layout/Post';
import NotFoundPage from './NotFoundPage';
import React from 'react';
import {useParams} from 'react-router-dom';

export default function BlogPost() {
	const {posts} = useGlobalContext();
	const params = useParams();

	const {filename, ...rest} = React.useMemo(() => {
		return posts.find((post) => post.name === params.name) || {};
	}, [posts, params.name]);

	if (!filename) {
		return <NotFoundPage />;
	}

	return (
		<PostLayout id={filename}>
			<Article id={filename} fullText comments {...rest} />
		</PostLayout>
	);
}
