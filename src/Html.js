import {Link} from '@mui/material';
import Interweave from 'interweave';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Html({content, ...props}) {
	const transform = React.useCallback((node, children) => {
		if (node.tagName.toLowerCase() === 'a') {
			const href = node.getAttribute('href');
			if (href.indexOf('/') === 0) {
				return <NavLink to={href}>{children}</NavLink>;
			}
			return <Link href={href}>{children}</Link>;
		}
		return undefined;
	}, []);

	return <Interweave content={content} {...props} transform={transform} />;
}

Html.propTypes = {
	content: PropTypes.node.isRequired,
};
