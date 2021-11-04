/* eslint-disable react/no-multi-comp */
import ROUTES from './routes';
import MuiPagination from '@mui/material/Pagination';
import MuiPaginationItem from '@mui/material/PaginationItem';
import PropTypes from 'prop-types';
import React from 'react';
import {useParams, generatePath, NavLink} from 'react-router-dom';

function PaginationItem({page, ...props}) {
	const to = React.useMemo(() => {
		if (page > 1) {
			return generatePath(ROUTES.page, {page});
		}
		return generatePath(ROUTES.home);
	}, [page]);

	return (
		<MuiPaginationItem
			component={NavLink}
			to={to}
			page={page}
			{...props}
		/>
	);
}

PaginationItem.propTypes = {
	page: PropTypes.number.isRequired,
};

export function usePagination(items, number = 5) {
	const params = useParams();

	const paginate = React.useMemo(() => {
		return items.length > number;
	}, [items.length, number]);

	const count = React.useMemo(() => {
		return Math.ceil(items.length / number);
	}, [items.length, number]);

	const page = React.useMemo(() => {
		return Number(params.page) || 1;
	}, [params.page]);

	const start = React.useMemo(() => {
		if (page > 1) {
			return number * (page - 1);
		}
		return 0;
	}, [number, page]);

	const end = React.useMemo(() => {
		if (page > 1) {
			return number * page;
		}
		return number;
	}, [number, page]);

	return React.useMemo(() => {
		return [
			items.slice(start, end),
			{paginate, count, page},
		];
	}, [items, start, end, paginate, count, page]);
}

export default function Pagination(props) {
	return (
		<MuiPagination
			variant="outlined"
			shape="rounded"
			renderItem={PaginationItem}
			{...props}
		/>
	);
}
/* eslint-enable react/no-multi-comp */
