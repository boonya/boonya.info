import Link from './Link';
import Markdown from './Markdown';
import {Stack, Skeleton, Card, Divider, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {DiscussionEmbed} from 'disqus-react';
import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet-async';
import YAML from 'yaml';

async function fetchPost(id) {
	const response = await fetch(`/_posts/${id}`);
	return response.text();
}

function trim(content) {
	return content.split(/<!--\s*more\s*-->/um)[0];
}

function parsePost(content) {
	// eslint-disable-next-line security/detect-unsafe-regex
	const match = content.match(/^-{3,}\n(?<meta>[.\s\S]+?)(?=-{3,}\n)-{3,}\n(?<md>[.\s\S]+)/um);
	const markdown = match.groups.md;
	const meta = YAML.parse(match.groups.meta);
	return {markdown, meta};
}

function useArticle(id, fullText) {
	const [article, setArticle] = React.useState();
	const [error, setError] = React.useState();

	React.useEffect(() => {
		(async () => {
			try {
				const response = await fetchPost(id);
				const post = fullText ? response : trim(response);
				const {markdown, meta} = parsePost(post);
				setArticle({title: meta.title, markdown});
			}
			catch (err) {
				setError(err);
			}
		})();
	}, [id, fullText]);

	return {article, error};
}

const useStyles = makeStyles(({spacing}) => ({
	'@keyframes smooth': {
		from: {opacity: 0},
		to: {opacity: 1},
	},
	root: {
		animationDuration: 500,
		animationName: '$smooth',
		padding: spacing(3, 2),
	},
	content: {},
}));

export default function Article({id, route, name, date, fullText, comments, ...props}) {
	const classes = useStyles(props);
	const {article, error} = useArticle(id, fullText);

	const title = React.useMemo(() => {
		if (!article?.title) {
			return null;
		}
		if (fullText) {
			return article.title;
		}
		return (
			<Link href={route} underline="hover">
				{article.title}
			</Link>
		);
	}, [article, fullText, route]);

	const dateTime = React.useMemo(() => {
		return new Date(date).toISOString();
	}, [date]);

	const formattedDate = React.useMemo(() => {
		return new Intl.DateTimeFormat('ru-UA').format(new Date(date));
	}, [date]);

	if (error) {
		return <Typography paragraph textAlign="center">An error occurred</Typography>;
	}

	if (!article) {
		return (
			<Card id={id} {...props} classes={{root: classes.root}}>
				<Stack>
					<Skeleton animation="wave" height={40} />
					<Skeleton animation="wave" height={40} width={200} />
					<Skeleton animation="wave" height={200} variant="rectangular" />
				</Stack>
			</Card>
		);
	}

	return (
		<Card {...props} classes={{root: classes.root}}>
			{fullText && (
				<Helmet>
					<title>{title}</title>
				</Helmet>
			)}
			<Typography variant="h1" htmlFor={id}>{title}</Typography>
			<Typography component="time" htmlFor={id} dateTime={dateTime}>{formattedDate}</Typography>
			<Markdown component="article" id={id} className={classes.content}>
				{article.markdown}
			</Markdown>
			{comments && (
				<>
					<Divider />
					<DiscussionEmbed
						shortname="boonya"
						config={{
							identifier: id,
							title,
							url: location.href,
						}}
					/>
				</>
			)}
			{!fullText && (
				<Link href={route} aria-label={`Детальніше про ${article?.title}`}>
					Детальніше
				</Link>
			)}
		</Card>
	);
}

Article.propTypes = {
	comments: PropTypes.bool,
	date: PropTypes.string.isRequired,
	fullText: PropTypes.bool,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
};

Article.defaultProps = {
	comments: false,
	fullText: false,
};
