import picture from './1.jpg';
import Box from '@mui/material/Box';
import React from 'react';

export default function Header() {
	return (
		<Box
			component="img"
			sx={{
				// height: 233,
				width: '100%',
				// maxHeight: {xs: 233, md: 167},
				// maxWidth: {xs: 350, md: 250},
			}}
			alt="The house from the offer."
			src={picture}
		/>
	);
}
