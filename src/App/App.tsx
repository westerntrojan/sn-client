import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {ThemeProvider} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import {SnackbarProvider} from 'notistack';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useMutation} from 'react-apollo';
import {loader} from 'graphql.macro';

import './App.scss';
import Header from '@/components/layouts/Header';
import {MainDrawer, AlterDrawer, MobileDrawer} from '@/components/layouts/drawers';
import {
	ThemePickerModal,
	HotKeysModal,
	SettingsModal,
	AuthModal,
	ExitModal,
} from '@/components/layouts/modals';
import ScrollButton from '@/components/layouts/ScrollButton';
import AdminButton from '@/components/layouts/AdminButton';
import AppSubsciptions from '@/components/layouts/AppSubsciptions';
import NotFound from '@/components/common/NotFound';
import {RootState} from '@/store/types';
import {exit, changeTwoFactorAuth} from '@/store/auth/actions';
import {loadApp, closeAuthModal} from '@/store/app/actions';
import {getCurrentTheme, changeTheme, changeThemeAnimations} from '@/utils/theme';
import {ChangeDrawer, Exit} from '@/utils/hotKeys';
import GlobalCss from './GlobalCss';
import SettingsContext from './SettingsContext';
import settings from './settings.json';

const StartSession = loader('./gql/StartSession.gql');
const EndSession = loader('./gql/EndSession.gql');

const useStyles = makeStyles(theme => ({
	toolbar: {
		...theme.mixins.toolbar,
		boxShadow: 'none',
	},
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

	const history = useHistory();

	const [themePickerModal, setThemePickerModal] = useState(false);
	const [hotKeysModal, setHotKeysModal] = useState(false);
	const [settingsModal, setSettingsModal] = useState(false);
	const [exitModal, setExitModal] = useState(false);
	const [alterDrawer, setAlterDrawer] = useState(false);
	const [mobileDrawer, setMobileDrawer] = useState(false);
	const [scrollButton, setScrollButton] = useState(false);
	const [theme, setTheme] = useState(getCurrentTheme());
	const notistackRef = useRef<any>();

	const app = useSelector((state: RootState) => state.app, shallowEqual);
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	const [startSession] = useMutation(StartSession);
	const [endSession] = useMutation(EndSession);

	const handleScroll = () => {
		if (window.scrollY > 400) {
			setScrollButton(true);
		} else {
			setScrollButton(false);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.ctrlKey && (e.key === 'b' || e.key === 'q')) {
			e.preventDefault();
		}

		if (e.key === '/') {
			e.preventDefault();
		}
	};

	const handleBeforeUnload = () => {
		endSession();
	};

	useEffect(() => {
		dispatch(loadApp());

		window.addEventListener('beforeunload', handleBeforeUnload);
		document.addEventListener('scroll', handleScroll);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			document.removeEventListener('scroll', handleScroll);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (auth.isAuth) {
			startSession();
		}
	}, [auth.isAuth]);

	// app settings
	const handleChangeTwoFactorAuth = () => {
		dispatch(changeTwoFactorAuth());
	};
	const handleChangeThemeAnimations = () => {
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
	}) => {
		const newTheme = changeTheme({palette, fontSize});

		setTheme(newTheme);
	};
	const handleResetTheme = () => {
		localStorage.removeItem('theme');

		const newTheme = getCurrentTheme();

		setTheme(newTheme);
	};

	const handleChangeDrawer = () => {
		alterDrawer ? setAlterDrawer(false) : setAlterDrawer(true);
	};

	const openMobileDrawer = () => {
		setMobileDrawer(true);
	};

	const handleExit = async () => {
		await endSession();

		setExitModal(false);

		dispatch(exit());

		history.push('/');
	};

	const handleCloseSnackbar = (key: string | number) => {
		notistackRef.current.closeSnackbar(key);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalCss />

			<SnackbarProvider
				ref={notistackRef}
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
				action={key => (
					<IconButton
						style={{color: 'white'}}
						size='small'
						onClick={() => handleCloseSnackbar(key)}
					>
						<CloseIcon fontSize='small' />
					</IconButton>
				)}
			>
				<div id='root'>
					<Header
						openDrawer={size['large'] ? handleChangeDrawer : openMobileDrawer}
						openThemePickerModal={() => setThemePickerModal(true)}
						openHotKeysModal={() => setHotKeysModal(true)}
						openSettingsModal={() => setSettingsModal(true)}
						exit={() => setExitModal(true)}
					/>

					{size['large'] && <>{alterDrawer ? <AlterDrawer /> : <MainDrawer />}</>}
					{!size['large'] && !size['small'] && <AlterDrawer />}
					<MobileDrawer open={mobileDrawer} closeDrawer={() => setMobileDrawer(false)} />

					<main className='content'>
						<div className={classes.toolbar} />

						<AppSubsciptions />

						{app.notFound ? <NotFound /> : children}
					</main>

					{auth.isAdmin && <AdminButton />}
					<ScrollButton open={scrollButton} />

					<ThemePickerModal
						open={themePickerModal}
						closeModal={() => setThemePickerModal(false)}
						handleChangeTheme={handleChangeTheme}
						handleResetTheme={handleResetTheme}
					/>
					<HotKeysModal open={hotKeysModal} closeModal={() => setHotKeysModal(false)} />
					<SettingsContext.Provider
						value={{handleChangeTwoFactorAuth, handleChangeThemeAnimations}}
					>
						<SettingsModal open={settingsModal} closeModal={() => setSettingsModal(false)} />
					</SettingsContext.Provider>
					<AuthModal open={app.authModal} closeModal={(): any => dispatch(closeAuthModal())} />
					<ExitModal open={exitModal} closeModal={() => setExitModal(false)} action={handleExit} />

					{/* hot keys */}
					<ChangeDrawer action={handleChangeDrawer} />
					<Exit action={handleExit} />
				</div>
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
