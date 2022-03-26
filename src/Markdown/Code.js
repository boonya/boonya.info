import {alpha} from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {LightAsync as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const useStyles = makeStyles(({typography, palette, spacing, shape}) => ({
	code: {
		fontFamily: typography.fontFamilyCode,
		backgroundColor: alpha(palette.primary.dark, 0.25),
		borderRadius: shape.borderRadius,
		color: palette.text.secondary,
	},
	inlineCode: {
		padding: spacing(0.5, 1),
	},
	codeBlock: {
		display: 'block',
		overflowX: 'auto',
		padding: spacing(2),
		borderRadius: shape.borderRadius,
		border: `1px solid ${palette.primary.dark}`,
	},
}));

function useLanguage(className) {
	const lang = className?.replace('lang-', '');
	switch (lang) {
		case 'sh':
			return 'shell';
		case 'js':
			return 'javascript';
		default:
			return lang;
	}
}

export default function Code({className, children, ...props}) {
	const classes = useStyles(props);
	const lang = useLanguage(className);
	const PreTag = useCallback(({children: v}) => v, []);

	if (!lang) {
		return <code className={clsx(classes.code, classes.inlineCode)}>{children}</code>;
	}

	return (
		<SyntaxHighlighter
			language={lang}
			codeTagProps={{className: clsx(classes.code, classes.codeBlock, `lang-${lang}`)}}
			PreTag={PreTag}
			// useInlineStyles={false}
			style={dark}
		>
			{children}
		</SyntaxHighlighter>
	);
}

Code.propTypes = {
	children: PropTypes.string.isRequired,
	className: PropTypes.string,
};

Code.defaultProps = {
	className: '',
};
