import MainPageLayout from './Layout/MainPage';
import {Typography} from '@mui/material';
import React from 'react';

export default function NotFoundPage() {
	return (
		<MainPageLayout>
			<Typography variant="h1">404 Not Found</Typography>
		</MainPageLayout>
	);
}
