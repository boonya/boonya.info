import MainPageLayout from './Layout/MainPage';
import {Typography} from '@mui/material';
import React from 'react';

export default function ErrorPage() {
	return (
		<MainPageLayout
			ContentProps={{
				container: true,
				justifyContent: 'center',
				alignContent: 'center',
			}}
		>
			<Typography variant="h1">An error occurred</Typography>
		</MainPageLayout>
	);
}
