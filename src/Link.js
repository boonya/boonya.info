/* eslint-disable react/no-multi-comp */
import MuiLink from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';

function RouterLink({href, ...props}) {
	return <MuiLink component={NavLink} {...props} to={href} />;
}

RouterLink.propTypes = {
	href: PropTypes.string.isRequired,
};

const onClick = (e) => {
	e.preventDefault();
	// eslint-disable-next-line no-alert
	alert('The link is broken');
};

export default function Link({href, ...props}) {
	if (!href) {
		return <MuiLink {...props} href="#" onClick={onClick} />;
	}
	if (href.indexOf('/') === 0) {
		return <RouterLink {...props} href={href} />;
	}
	if (href.indexOf(location.origin) === 0) {
		const to = href.split(location.origin).pop();
		return <RouterLink {...props} href={to} />;
	}
	if ((/^(?:mailto:|tel:|#).+/u).test(href)) {
		return <MuiLink {...props} href={href} />;
	}
	if ((/^https?:\/\/.+/u).test(href)) {
		return <MuiLink {...props} href={href} target="_blank" />;
	}
	return <MuiLink {...props} href={href} />;
}

Link.propTypes = {
	href: PropTypes.string.isRequired,
};
/* eslint-enable react/no-multi-comp */
