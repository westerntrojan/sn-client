import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import {SnackbarProvider} from 'notistack';
import {useHistory} from 'react-router';

import './App.scss';
import Header from '@components/layouts/Header';
import {MainDrawer, AlterDrawer, MobileDrawer} from '@components/layouts/drawers';
import {
	ThemePickerModal,
	HotKeysModal,
	SettingsModal,
	AuthModal,
	ExitModal,
} from '@components/layouts/modals';
import ScrollButton from '@components/layouts/ScrollButton';
import AdminButton from '@components/layouts/AdminButton';
import AppSubsciptions from '@components/layouts/AppSubsciptions';
import NotFound from '@components/common/NotFound';
import {RootState} from '@store/types';
import {exit, changeTwoFactorAuth} from '@store/auth/actions';
import {loadApp, closeAuthModal} from '@store/app/actions';
import {getCurrentTheme, changeTheme, changeThemeAnimations} from '@utils/theme';
import {ChangeDrawer, Exit} from '@utils/hotKeys';
import GlobalCss from './GlobalCss';
import SettingsContext from './SettingsContext';

import settings from './settings.json';

const useStyles = makeStyles(theme => ({
	toolbar: {...theme.mixins.toolbar},
	snackbar: {
		color: 'white',
	},
}));

type Props = {
	children: React.ReactNode;
};

const App: React.FC<Props> = ({children}) => {
	const size = {
		small: useMediaQuery(`(max-width:${settings.display.small})`),
		large: useMediaQuery(`(min-width:${settings.display.large})`),
	};

	const classes = useStyles();

	const [themePickerModal, setThemePickerModal] = useState(false);
	const [hotKeysModal, setHotKeysModal] = useState(false);
	const [settingsModal, setSettingsModal] = useState(false);
	const [exitModal, setExitModal] = useState(false);
	const [alterDrawer, setAlterDrawer] = useState(false);
	const [mobileDrawer, setMobileDrawer] = useState(false);
	const [scrollButton, setScrollButton] = useState(false);
	const [theme, setTheme] = useState(getCurrentTheme());

	const app = useSelector((state: RootState) => state.app, shallowEqual);
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	const history = useHistory();

	// loading app
	useEffect(() => {
		dispatch(loadApp());
	}, [dispatch]);

	// added app events
	useEffect(() => {
		const _handleScroll = (): void => {
			if (window.scrollY > 400) {
				setScrollButton(true);
			} else {
				setScrollButton(false);
			}
		};

		const _handleKey = (e: KeyboardEvent): void => {
			if (e.ctrlKey && (e.key === 'b' || e.key === 'q')) {
				e.preventDefault();
			}

			if (e.key === '/') {
				e.preventDefault();
			}
		};

		window.addEventListener('scroll', _handleScroll);
		document.addEventListener('keydown', _handleKey);

		return function cleanup(): void {
			window.removeEventListener('scroll', _handleScroll);
			document.removeEventListener('keydown', _handleKey);
		};
	}, [dispatch]);

	// app settings
	const handleChangeTwoFactorAuth = (): void => {
		dispatch(changeTwoFactorAuth());
	};
	const handleChangeThemeAnimations = (): void => {
		const newTheme = changeThemeAnimations();

		setTheme(newTheme);
	};

	// theme options
	const handleChangeTheme = ({
		palette,
		fontSize,
	}: {
		palette?: PaletteOptions;
		fontSize?: number;
	}): void => {
		const newTheme = changeTheme({palette, fontSize});

		setTheme(newTheme);
	};
	const handleResetTheme = (): void => {
		localStorage.removeItem('theme');

		const newTheme = getCurrentTheme();

		setTheme(newTheme);
	};

	const handleChangeDrawer = (): void => {
		alterDrawer ? setAlterDrawer(false) : setAlterDrawer(true);
	};

	const openMobileDrawer = (): void => {
		setMobileDrawer(true);
	};

	const handleExit = (): void => {
		setExitModal(false);

		dispatch(exit());

		history.push('/');
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalCss />

			<AppSubsciptions />

			<SnackbarProvider
				maxSnack={4}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				classes={{
					variantSuccess: classes.snackbar,
					variantError: classes.snackbar,
					variantWarning: classes.snackbar,
					variantInfo: classes.snackbar,
				}}
			>
				<div id='root'>
					<Header
						openDrawer={size['large'] ? handleChangeDrawer : openMobileDrawer}
						openThemePickerModal={(): void => setThemePickerModal(true)}
						openHotKeysModal={(): void => setHotKeysModal(true)}
						openSettingsModal={(): void => setSettingsModal(true)}
						exit={(): void => setExitModal(true)}
					/>

					{size['large'] && <>{alterDrawer ? <AlterDrawer /> : <MainDrawer />}</>}
					{!size['large'] && !size['small'] && <AlterDrawer />}
					<MobileDrawer open={mobileDrawer} closeDrawer={(): void => setMobileDrawer(false)} />

					<main className='content'>
						<div className={classes.toolbar} />

						{app.notFound ? <NotFound /> : children}
					</main>

					{auth.isAdmin && <AdminButton />}
					<ScrollButton open={scrollButton} />

					<ThemePickerModal
						open={themePickerModal}
						closeModal={(): void => setThemePickerModal(false)}
						handleChangeTheme={handleChangeTheme}
						handleResetTheme={handleResetTheme}
					/>
					<HotKeysModal open={hotKeysModal} closeModal={(): void => setHotKeysModal(false)} />
					<SettingsContext.Provider
						value={{handleChangeTwoFactorAuth, handleChangeThemeAnimations}}
					>
						<SettingsModal open={settingsModal} closeModal={(): void => setSettingsModal(false)} />
					</SettingsContext.Provider>
					<AuthModal open={app.authModal} closeModal={(): any => dispatch(closeAuthModal())} />
					<ExitModal
						open={exitModal}
						closeModal={(): void => setExitModal(false)}
						action={handleExit}
					/>

					{/* hot keys */}
					<ChangeDrawer action={handleChangeDrawer} />
					<Exit action={handleExit} />
				</div>
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
