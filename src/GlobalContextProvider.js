import PropTypes from 'prop-types';
import React from 'react';

export const GlobalContext = React.createContext();

export function useGlobalContext() {
	const context = React.useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalContext hook can not be executed outside of GlobalContext.Provider');
	}
	return context;
}

export default function GlobalContextProvider({children, posts, redirects}) {
	return (
		<GlobalContext.Provider value={{posts, redirects}}>
			{children}
		</GlobalContext.Provider>
	);
}

const POST_PROP_TYPES = {
	filename: PropTypes.string.isRequired,
	// name: PropTypes.string.isRequired,
	// date: PropTypes.instanceOf(Date).isRequired,
	route: PropTypes.string.isRequired,
};

GlobalContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
	posts: PropTypes.arrayOf(PropTypes.shape(POST_PROP_TYPES)).isRequired,
	redirects: PropTypes.instanceOf(Map).isRequired,
};
