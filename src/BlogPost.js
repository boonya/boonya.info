import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import PostLayout from './Layout/Post';
import {DiscussionEmbed} from 'disqus-react';
import React from 'react';
import {useParams} from 'react-router-dom';

export default function BlogPost() {
	const {posts} = useGlobalContext();
	const params = useParams();

	const {filename, ...rest} = React.useMemo(() => {
		return posts.find((post) => post.name === params.name);
	}, [posts, params.name]);

	return (
		<PostLayout id={filename}>
			<Article id={filename} fullText {...rest} />
			<DiscussionEmbed
				shortname="comments"
				config={{
					identifier: filename,
					// title,
					url: location.pathname,
				}}
			/>
		</PostLayout>
	);
}
