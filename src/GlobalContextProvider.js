import PropTypes from 'prop-types';
import React from 'react';

export const GlobalContext = React.createContext();

/**
 * @typedef {Object} Env
 * @property {string} THEME_COLOR
 * @property {string} BG_COLOR
 * @property {string} AUTHOR
 * @property {string} NAME
 * @property {string} TITLE
 * @property {string} KEYWORDS
 * @property {string} DESCRIPTION
 *
 * @typedef {Object} Post
 * @property {string} filename
 * @property {string} name
 * @property {string} route
 * @property {string} date
 *
 * @typedef {Map} Redirect
 *
 * @returns {{env: Env, posts: Post[], redirects: Redirect[]}}
 */
export function useGlobalContext() {
	const context = React.useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalContext hook can not be executed outside of GlobalContext.Provider');
	}
	return context;
}

export default function GlobalContextProvider({children, env, posts, redirects}) {
	return (
		<GlobalContext.Provider value={{env, posts, redirects}}>
			{children}
		</GlobalContext.Provider>
	);
}

const ENV_PROP_TYPES = {
	THEME_COLOR: PropTypes.string.isRequired,
	BG_COLOR: PropTypes.string.isRequired,
	AUTHOR: PropTypes.string.isRequired,
	NAME: PropTypes.string.isRequired,
	TITLE: PropTypes.string.isRequired,
	KEYWORDS: PropTypes.string.isRequired,
	DESCRIPTION: PropTypes.string.isRequired,
};

const POST_PROP_TYPES = {
	filename: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
};

GlobalContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	env: PropTypes.shape(ENV_PROP_TYPES).isRequired,
	posts: PropTypes.arrayOf(PropTypes.shape(POST_PROP_TYPES)).isRequired,
	redirects: PropTypes.instanceOf(Map).isRequired,
};
