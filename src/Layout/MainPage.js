import Root from './Root';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function MainPage({children, ContentProps, ...props}) {
	return (
		<Root {...props}>
			<Grid
				item
				xs={11}
				lg={10}
				xl={7}
				component="main"
				id="content"
				{...ContentProps}
			>
				{children}
			</Grid>
		</Root>
	);
}

MainPage.propTypes = {
	children: PropTypes.node.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	ContentProps: PropTypes.object,
};

MainPage.defaultProps = {
	ContentProps: undefined,
};
