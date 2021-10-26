import Markdown from './Markdown';
import {Grid} from '@mui/material';
import React from 'react';

export default function App() {
	return (
		<Grid container justifyContent="center">
			<Grid item xs={12} component="header">header</Grid>
			<Grid item xs={12} md={8} component="main">
				<Markdown>markdown post</Markdown>
			</Grid>
			<Grid item xs={12} md={4} component="aside">aside</Grid>
			<Grid item xs={12} component="footer">footer</Grid>
		</Grid>
	);
}
