import Root from './Root';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function Post({children}) {
	return (
		<Root spacing={3}>
			<Grid item xs={12} md={8} lg={7} xl={6} component="main" id="content">
				{children}
			</Grid>
		</Root>
	);
}

Post.propTypes = {
	children: PropTypes.node.isRequired,
};
