import App from './App';
import {render, screen} from '@testing-library/react';
import React from 'react';

it('renders learn react link', () => {
	render(<App />);
	const link = screen.getByRole('link', {name: /learn react/iu});
	expect(link).toBeInTheDocument();
});
