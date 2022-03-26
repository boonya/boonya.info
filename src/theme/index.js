import components from './components';
import {createTheme} from '@mui/material/styles';

export default () => createTheme({
	typography: {
		fontFamily: "'Fira Sans Extra Condensed', sans-serif",
		fontFamilyCode: "'Ubuntu Mono', monospace",
		htmlFontSize: 16,
		fontSize: 14,
		h1: {
			fontSize: '2rem',
		},
		h2: {
			fontSize: '1.8rem',
		},
		h3: {
			fontSize: '1.5rem',
		},
		h4: {
			fontSize: '1.25rem',
		},
		h5: {
			fontSize: '1.1rem',
		},
		h6: {
			fontSize: '1rem',
		},
	},
	palette: {
		mode: 'dark',
		primary: {
			main: '#7cb342',
		},
		secondary: {
			main: '#ff6e40',
		},
		text: {
			primary: '#aab4be',
			secondary: '#fdfeff',
		},
		background: {
			default: '#072111',
			paper: '#0d290a',
		},
	},
	components,
});
