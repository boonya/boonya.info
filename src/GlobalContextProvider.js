import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {Object} Post
 * @property {string} filename
 * @property {string} name
 * @property {string} route
 * @property {string} date
 *
 * @typedef {Map} Redirect
 *
 * @typedef {Object} GlobalContext
 * @property {string} author
 * @property {string} name
 * @property {string} title
 * @property {string} keywords
 * @property {string} description
 * @property {string} basePath
 * @property {Post[]} posts
 * @property {Redirect[]} redirects
 */

/** @type {GlobalContext} */
export const GlobalContext = React.createContext();

/**
 * @returns {GlobalContext}
 */
export function useGlobalContext() {
	const context = React.useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalContext hook can not be executed outside of GlobalContext.Provider');
	}
	return context;
}

export default function GlobalContextProvider({
	children,
	posts,
	redirects,
	author,
	name,
	title,
	keywords,
	description,
	basePath,
}) {
	return (
		<GlobalContext.Provider
			value={{
				posts,
				redirects,
				author,
				name,
				title,
				keywords,
				description,
				basePath,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

const POST_PROP_TYPES = {
	filename: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
};

GlobalContextProvider.propTypes = {
	author: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	posts: PropTypes.arrayOf(PropTypes.shape(POST_PROP_TYPES)).isRequired,
	redirects: PropTypes.instanceOf(Map).isRequired,
	title: PropTypes.string.isRequired,
};
