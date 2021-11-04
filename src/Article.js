import Html from './Html';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Article({id, link, title, date, children}) {
	const titleNode = React.useMemo(() => {
		if (link) {
			return <h1><NavLink to={link}>{title}</NavLink></h1>;
		}
		return <h1>{title}</h1>;
	}, [link, title]);

	const dateNode = React.useMemo(() => {
		return new Intl.DateTimeFormat('ru-UA').format(date);
	}, [date]);

	return (
		<article id={id}>
			{titleNode}
			<Html content={children} />
			{dateNode}
		</article>
	);
}

Article.propTypes = {
	children: PropTypes.node.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	id: PropTypes.string.isRequired,
	link: PropTypes.string,
	title: PropTypes.node.isRequired,
};

Article.defaultProps = {
	link: undefined,
};
