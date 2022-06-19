/**
 * https://fonts.google.com/share?selection.family=Pangolin%7CUbuntu%20Mono
 */
import Pangolin from '@fontsource/pangolin';
import UbuntuMono from '@fontsource/ubuntu-mono';

export default () => ({
	MuiCssBaseline: {
		styleOverrides: `${Pangolin.toString()}\n${UbuntuMono.toString()}`,
	},
	// MuiCssBaseline: {
	// 	styleOverrides: {
	// 		'html, body, #root': {
	// 			padding: 0,
	// 			margin: 0,
	// 			height: '100%',
	// 		},
	// 	},
	// },
	MuiButton: {
		defaultProps: {
			variant: 'contained',
		},
	},
	MuiLoadingButton: {
		defaultProps: {
			variant: 'contained',
		},
	},
	MuiIconButton: {
		defaultProps: {
			color: 'primary',
		},
	},
	MuiFab: {
		defaultProps: {
			color: 'primary',
		},
	},
	MuiTextField: {
		defaultProps: {
			fullWidth: true,
			margin: 'none',
		},
	},
	MuiTooltip: {
		defaultProps: {
			arrow: true,
		},
	},
	// MuiPaper: {
	// 	defaultProps: {
	// 		elevation: 0,
	// 	},
	// },
});
