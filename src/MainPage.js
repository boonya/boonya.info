import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import MainPageLayout from './Layout/MainPage';
import NotFoundPage from './NotFoundPage';
import Pagination, {usePagination} from './Pagination';
import {makeStyles} from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(({spacing}) => ({
	article: {
		marginBottom: spacing(4),
	},
	content: {
		'& img': {
			maxHeight: 200,
			display: 'block',
			margin: '0 auto',
		},
	},
}));

export default function MainPage(props) {
	const classes = useStyles(props);
	const globals = useGlobalContext();
	const [posts, {paginate, isValid, count, page}] = usePagination(globals.posts);

	const items = React.useMemo(() => {
		return posts.map(({filename, ...rest}) => {
			return (
				<Article
					key={filename}
					id={filename}
					classes={{
						root: classes.article,
						content: classes.content,
					}}
					{...rest}
				/>
			);
		});
	}, [classes.article, classes.content, posts]);

	if (!isValid) {
		return <NotFoundPage />;
	}

	return (
		<MainPageLayout>
			{items}
			{paginate && <Pagination count={count} page={page} />}
		</MainPageLayout>
	);
}
