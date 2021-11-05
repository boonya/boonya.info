import Link from './Link';
import {Typography, Divider} from '@mui/material';
import {makeStyles} from '@mui/styles';
import MarkdownToJsx from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
	root: {
		'& img': {
			maxWidth: '100%',
		},
	},
}));

export default function Markdown({children, options, ...props}) {
	const classes = useStyles(props);

	const Wrapper = React.useCallback((args) => {
		return <Typography component="div" className={classes.root} {...args} />;
	}, [classes.root]);

	const HR = React.useCallback((args) => <Divider {...args} />, []);

	const Text = React.useCallback(({children: value}) => value, []);

	const headingsOverrides = React.useMemo(() => {
		return {
			h1: Text,
			h2: Text,
			h3: Text,
			h4: Text,
			h5: Text,
			h6: Text,
		};
	}, [Text]);

	const overrides = React.useMemo(() => ({
		hr: HR,
		a: Link,
		...headingsOverrides,
		...options.overrides,
	}), [HR, headingsOverrides, options.overrides]);

	if (!children) {
		return null;
	}

	return (
		<MarkdownToJsx
			options={{
				forceWrapper: true,
				wrapper: Wrapper,
				overrides,
				disableParsingRawHTML: true,
				...options,
			}}
			{...props}
		>
			{children}
		</MarkdownToJsx>
	);
}

const OVERRIDES_PROP_TYPES = {
	h1: PropTypes.elementType,
	h2: PropTypes.elementType,
	h3: PropTypes.elementType,
	h4: PropTypes.elementType,
	h5: PropTypes.elementType,
	h6: PropTypes.elementType,
	p: PropTypes.elementType,
	ul: PropTypes.elementType,
	li: PropTypes.elementType,
	ol: PropTypes.elementType,
	pre: PropTypes.elementType,
	code: PropTypes.elementType,
	blockquote: PropTypes.elementType,
	strong: PropTypes.elementType,
	em: PropTypes.elementType,
	del: PropTypes.elementType,
	hr: PropTypes.elementType,
};

const OPTIONS_PROP_TYPES = {
	overrides: PropTypes.shape(OVERRIDES_PROP_TYPES),
	disableParsingRawHTML: PropTypes.bool,
};

Markdown.propTypes = {
	children: PropTypes.string.isRequired,
	options: PropTypes.shape(OPTIONS_PROP_TYPES),
};

Markdown.defaultProps = {
	options: {},
};
