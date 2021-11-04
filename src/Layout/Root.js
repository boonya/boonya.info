import Header from '../Header';
import {Grid, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(({spacing}) => ({
	content: {
		paddingTop: spacing(3),
	},
}));

export default function Root({children, ...props}) {
	const classes = useStyles(props);

	return (
		<Grid
			container
			direction="column"
			wrap="nowrap"
			minHeight="100%"
			{...props}
		>
			<Grid item>
				<Header />
			</Grid>
			<Grid item container justifyContent="center" flexGrow={1} className={classes.content}>
				{children}
			</Grid>
			<Grid item component="footer" textAlign="center" padding={2}>
				<Typography>&copy; boonya.info from 2008 till now.</Typography>
			</Grid>
		</Grid>
	);
}

Root.propTypes = {
	children: PropTypes.node.isRequired,
};
