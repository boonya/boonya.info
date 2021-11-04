import {createTheme} from '@mui/material/styles';

export default createTheme({
	palette: {
		primary: {
			main: '#337ab7',
		},
		secondary: {
			main: ENV.themeColor,
		},
		background: {
			default: ENV.bgColor,
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
