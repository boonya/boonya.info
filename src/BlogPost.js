import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import PostLayout from './Layout/Post';
import NotFoundPage from './NotFoundPage';
import {makeStyles} from '@mui/styles';
import React from 'react';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles(() => ({
	content: {
		'& img': {
			maxHeight: 500,
			display: 'block',
			margin: '0 auto',
		},
	},
}));

export default function BlogPost(props) {
	const classes = useStyles(props);
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
			<Article id={filename} fullText comments {...rest} classes={{content: classes.content}} />
		</PostLayout>
	);
}
