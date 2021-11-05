import ErrorPage from './ErrorPage';
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line react/require-optimization
export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	// componentDidCatch(error, errorInfo) {
	// 	logErrorToMyService(error, errorInfo);
	// }

	render() {
		if (this.state.hasError) {
			return <ErrorPage />;
		}
		return this.props.children;
	}
}

// eslint-disable-next-line react/static-property-placement
ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
};
