import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import Code from './Code';
import Image from './Image';
import {Typography, Divider} from '@mui/material';
import {makeStyles} from '@mui/styles';
import MarkdownToJsx from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo} from 'react';
import slugify from 'slugify';

const useStyles = makeStyles(() => ({
	root: {},
	pre: {
		position: 'relative',
	},
}));

export default function Markdown({children, options, ...props}) {
	const classes = useStyles(props);

	const Wrapper = useCallback((args) => {
		return <Typography component="div" classes={{root: classes.root}} {...args} />;
	}, [classes.root]);

	const overrides = useMemo(() => ({
		hr: Divider,
		a: Link,
		img: Image,
		code: Code,
		pre: {props: {className: classes.pre}},
		...options.overrides,
	}), [options.overrides]);

	if (!children) {
		return null;
	}

	return (
		<ErrorBoundary>
			<MarkdownToJsx
				options={{
					forceWrapper: true,
					wrapper: Wrapper,
					overrides,
					slugify: (value) => slugify(value, {lower: true}),
					disableParsingRawHTML: false,
					...options,
				}}
				{...props}
			>
				{children}
			</MarkdownToJsx>
		</ErrorBoundary>
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
