import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import PostLayout from './Layout/Post';
import {DiscussionEmbed} from 'disqus-react';
import React from 'react';
import {useParams} from 'react-router-dom';

export default function BlogPost() {
	const {blog} = useGlobalContext();
	const params = useParams();

	const {filename, title, date, html} = React.useMemo(() => {
		return blog.find((post) => post.name === params.name);
	}, [blog, params.name]);

	return (
		<PostLayout id={filename}>
			<Article
				id={filename}
				title={title}
				date={date}
			>
				{html}
			</Article>
			<DiscussionEmbed
				shortname="comments"
				config={{
					identifier: filename,
					title,
					url: location.pathname,
				}}
			/>
		</PostLayout>
	);
}
