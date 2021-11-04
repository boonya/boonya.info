import Article from './Article';
import {useGlobalContext} from './GlobalContextProvider';
import MainPageLayout from './Layout/MainPage';
import Pagination, {usePagination} from './Pagination';
import React from 'react';

export default function MainPage() {
	const globals = useGlobalContext();
	const [posts, {paginate, count, page}] = usePagination(globals.posts);

	const items = React.useMemo(() => {
		return posts.map(({filename, ...rest}) => {
			return <Article key={filename} id={filename} {...rest} />;
		});
	}, [posts]);

	return (
		<MainPageLayout>
			{items}
			{paginate && <Pagination count={count} page={page} />}
		</MainPageLayout>
	);
}
