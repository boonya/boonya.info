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
}));

export default function MainPage() {
	const classes = useStyles();
	const globals = useGlobalContext();
	const [posts, {paginate, isValid, count, page}] = usePagination(globals.posts);

	const items = React.useMemo(() => {
		return posts.map(({filename, ...rest}) => {
			return <Article key={filename} id={filename} className={classes.article} {...rest} />;
		});
	}, [classes.article, posts]);

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
