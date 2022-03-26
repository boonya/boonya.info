import {useGlobalContext} from '../GlobalContextProvider';
import {makeStyles} from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: '100%',
	},
}));

function useSource(basePath, src) {
	if (!basePath || !src.startsWith('/')) {
		return src;
	}
	return `${basePath}${src.replace(/^\//u, '')}`;
}

export default function Image({className, ...props}) {
	const classes = useStyles(props);
	const {basePath} = useGlobalContext();
	const src = useSource(basePath, props.src);

	// eslint-disable-next-line jsx-a11y/alt-text
	return <img {...props} src={src} className={clsx(classes.root, className)} />;
}

Image.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
};

Image.defaultProps = {
	className: undefined,
};
