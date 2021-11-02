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

export default function GlobalContextProvider({children, blog}) {
	return (
		<GlobalContext.Provider value={{blog}}>
			{children}
		</GlobalContext.Provider>
	);
}

const POST_PROP_TYPES = {
	filename: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date).isRequired,
	title: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	html: PropTypes.string.isRequired,
	redirectFrom: PropTypes.arrayOf(PropTypes.string),
};

GlobalContextProvider.propTypes = {
	blog: PropTypes.arrayOf(PropTypes.shape(POST_PROP_TYPES)).isRequired,
	children: PropTypes.node.isRequired,
};
