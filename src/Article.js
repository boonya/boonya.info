import Markdown from './Markdown';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import YAML from 'yaml';

async function fetchPost(id) {
	const response = await fetch(`/_posts/${id}`);
	return response.text();
}

function trim(content) {
	return content.split(/<!--\s*more\s*-->/um)[0];
}

function parsePost(content) {
	const match = content.match(/^-{3,}\n(?<meta>[.\s\S]+?)(?=-{3,}\n)-{3,}\n(?<md>[.\s\S]+)/um);
	const markdown = match.groups.md;
	const meta = YAML.parse(match.groups.meta);
	return {markdown, meta};
}

function useArticle(id, fullText) {
	const [content, setContent] = React.useState();

	React.useEffect(() => {
		(async () => {
			const response = await fetchPost(id);
			const post = fullText ? response : trim(response);
			const {markdown, meta} = parsePost(post);
			setContent({title: meta.title, markdown});
		})();
	}, [id, fullText]);

	return content;
}

export default function Article({id, route, fullText, ...props}) {
	const article = useArticle(id, fullText);

	const date = React.useMemo(() => {
		return new Date(props.date);
	}, [props.date]);

	const formattedDate = React.useMemo(() => {
		return new Intl.DateTimeFormat('ru-UA').format(date);
	}, [date]);

	if (!article) {
		return <Skeleton animation="wave" />;
	}

	const {title, markdown} = article || {};

	return (
		<Card>
			{fullText
				? <h1 htmlFor={id}>{title}</h1>
				: <h1 htmlFor={id}><NavLink to={route}>{title}</NavLink></h1>}
			<time dateTime={date}>{formattedDate}</time>
			<article id={id}>
				<Markdown>{markdown}</Markdown>
			</article>
		</Card>
	);
}

Article.propTypes = {
	date: PropTypes.string.isRequired,
	fullText: PropTypes.bool,
	id: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
};

Article.defaultProps = {
	fullText: false,
};
