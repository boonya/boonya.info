import ROUTES from '../routes';
import MuiPaginationItem from '@mui/material/PaginationItem';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {generatePath, NavLink, createSearchParams} from 'react-router-dom';

export default function Item({page, ...props}) {
	const to = useMemo(() => {
		if (page > 1) {
			const searchParams = createSearchParams({page});
			return `${ROUTES.home}?${searchParams}`;
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

Item.propTypes = {
	page: PropTypes.number.isRequired,
};
