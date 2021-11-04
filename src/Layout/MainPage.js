import Root from './Root';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function MainPage({children}) {
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

MainPage.propTypes = {
	children: PropTypes.node.isRequired,
};
