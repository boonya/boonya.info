import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'markdown-to-jsx';
import React from 'react';

function MarkdownListItem(props) {
	return <Box component="li" sx={{mt: 1, typography: 'body1'}} {...props} />;
}

const options = {
	overrides: {
		h1: {
			component: Typography,
			props: {
				gutterBottom: true,
				variant: 'h4',
				component: 'h1',
			},
		},
		h2: {
			component: Typography,
			props: {gutterBottom: true, variant: 'h6', component: 'h2'},
		},
		h3: {
			component: Typography,
			props: {gutterBottom: true, variant: 'subtitle1'},
		},
		h4: {
			component: Typography,
			props: {
				gutterBottom: true,
				variant: 'caption',
				paragraph: true,
			},
		},
		p: {
			component: Typography,
			props: {paragraph: true},
		},
		a: {component: Link},
		li: {
			component: MarkdownListItem,
		},
	},
};

// eslint-disable-next-line react/no-multi-comp
export default function Markdown(props) {
	return <ReactMarkdown options={options} {...props} />;
}