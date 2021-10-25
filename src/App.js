// import post from '../_posts/2021-10-23-raspi-ubuntu-20.04.03.md';
import Markdown from './Markdown';
import {Grid} from '@mui/material';
import React from 'react';

// const listing = require.context('../_posts');
// const context = require.context('../_posts', true, /\.md$/iu);

export default function App() {
	// context('.').then((locale) => {
	// 	// do something with locale
	// 	console.log('locale:', locale);
	// });

	return (
		<Grid container justifyContent="center">
			<Grid item xs={12} component="header">header</Grid>
			<Grid item xs={12} md={8} component="main">
				{/* <Markdown>{post}</Markdown> */}
				Some Markdown
			</Grid>
			<Grid item xs={12} md={4} component="aside">aside</Grid>
			<Grid item xs={12} component="footer">footer</Grid>
		</Grid>
	);
}
