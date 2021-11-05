import {useGlobalContext} from '../GlobalContextProvider';
import Link from '../Link';
import ROUTES from '../routes';
import {AppBar, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React from 'react';
import {useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles(({spacing}) => ({
	root: {
		padding: spacing(2),
	},
}));

export default function Header() {
	const classes = useStyles();
	const {env} = useGlobalContext();
	const {isExact} = useRouteMatch({path: ROUTES.home});

	const name = React.useMemo(() => {
		if (isExact) {
			return env.NAME;
		}
		return <Link href={ROUTES.home} color="inherit">{env.NAME}</Link>;
	}, [env, isExact]);

	return (
		<AppBar position="relative" className={classes.root}>
			<Typography component="h1">{name}</Typography>
			<Typography component="h2">{env.TITLE}</Typography>
		</AppBar>
	);
}
