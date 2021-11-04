import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function Root({children, ...props}) {
	return (
		<Grid
			container
			direction="column"
			wrap="nowrap"
			minHeight="100%"
			{...props}
		>
			<Grid item component="header">
				header
			</Grid>
			<Grid item container justifyContent="center" flexGrow={1}>
				{children}
			</Grid>
			<Grid item component="footer">
				<p>&copy; boonya.info from 2008 till now.</p>
			</Grid>
		</Grid>
	);
}

Root.propTypes = {
	children: PropTypes.node.isRequired,
};
