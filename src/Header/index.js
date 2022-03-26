import {useGlobalContext} from '../GlobalContextProvider';
import Link from '../Link';
import ROUTES from '../routes';
import {AppBar, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React, {useMemo} from 'react';
import {useMatch, useSearchParams} from 'react-router-dom';

const useStyles = makeStyles(({spacing}) => ({
	root: {
		padding: spacing(2),
	},
}));

export default function Header() {
	const classes = useStyles();
	const globals = useGlobalContext();
	const match = useMatch(ROUTES.home);
	const [searchParams] = useSearchParams();

	const name = useMemo(() => {
		if (match && !searchParams.get('page')) {
			return globals.name;
		}
		return <Link href={ROUTES.home} color="inherit">{globals.name}</Link>;
	}, [globals.name, match, searchParams]);

	return (
		<AppBar position="relative" className={classes.root}>
			<Typography component="h1">{name}</Typography>
			<Typography component="h2">{globals.title}</Typography>
		</AppBar>
	);
}
