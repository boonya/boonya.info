/**
 * https://fonts.google.com/share?selection.family=Fira%20Sans%20Extra%20Condensed%7CUbuntu%20Mono
 */
import FiraSans from '@fontsource/fira-sans-extra-condensed';
import UbuntuMono from '@fontsource/ubuntu-mono';

export default {
	MuiCssBaseline: {
		styleOverrides: `${FiraSans.toString()}\n${UbuntuMono.toString()}`,
	},
	MuiPaper: {
		defaultProps: {
			elevation: 0,
		},
	},
};
