import {createTheme} from '@mui/material/styles';

export default function ({color, background}) {
	return createTheme({
		palette: {
			primary: {
				main: color,
			},
			secondary: {
				main: '#44BB44',
			},
			background: {
				default: background,
			},
		},
		typography: {
			htmlFontSize: 16,
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
		components: {
			MuiPaper: {
				defaultProps: {
					elevation: 0,
				},
			},
		},
	});
}
