import Item from './Item';
import MuiPagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import React from 'react';

export {default as usePagination} from './usePagination';

export default function Pagination({page, ...props}) {
	return (
		<MuiPagination
			variant="outlined"
			shape="rounded"
			renderItem={Item}
			page={page || 1}
			{...props}
		/>
	);
}

Pagination.propTypes = {
	page: PropTypes.number,
};

Pagination.defaultProps = {
	page: undefined,
};
