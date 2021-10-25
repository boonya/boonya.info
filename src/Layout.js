import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function Layout({children}) {
	return (
		<Grid container justifyContent="center">
			<Grid item xs={11} sm={10} md={9} lg={8}>{children}</Grid>
		</Grid>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};
