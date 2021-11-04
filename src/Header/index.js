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
	const {isExact} = useRouteMatch({path: ROUTES.home});

	const name = React.useMemo(() => {
		if (isExact) {
			return ENV.name;
		}
		return <Link href={ROUTES.home} color="inherit">{ENV.name}</Link>;
	}, [isExact]);

	return (
		<AppBar position="relative" className={classes.root}>
			<Typography component="h1">{name}</Typography>
			<Typography component="h2">{ENV.title}</Typography>
		</AppBar>
	);
}
