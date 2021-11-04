import Root from './Root';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function Post({children}) {
	return (
		<Root>
			<Grid
				item
				xs={11}
				lg={10}
				xl={7}
				component="main"
				id="content"
			>
				{children}
			</Grid>
		</Root>
	);
}

Post.propTypes = {
	children: PropTypes.node.isRequired,
};
