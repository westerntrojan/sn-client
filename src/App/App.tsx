import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import {SnackbarProvider} from 'notistack';

import './style.scss';
import Header from '@components/layouts/Header';
import {MainDrawer, AlterDrawer, MobileDrawer} from '@components/layouts/Drawers';
import ThemePickerModal from '@components/layouts/ThemePickerModal';
import HotKeysModal from '@components/layouts/HotKeysModal';
import SettingsModal from '@components/layouts/SettingsModal';
import ExitModal from '@components/layouts/ExitModal';
import ScrollButton from '@components/layouts/ScrollButton';
import AdminButton from '@components/layouts/AdminButton';
import NotFound from '@components/NotFound';
import {RootState} from '@store/types';
import {exit, changeTwoFactorAuth} from '@store/auth/actions';
import {loadApp} from '@store/app/actions';
import {getCurrentTheme, changeTheme, changeThemeAnimations} from '@utils/app';
import {ChangeDrawer, Exit} from '@utils/hotKeys';
import {IArticle} from '@store/types';
import callApi from '@utils/callApi';
import GlobalCss from './GlobalCss';
import Context from './context';
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
	const [topTags, setTopTags] = useState([]);
	const [topArticles, setTopArticles] = useState<IArticle[]>([]);
	const [loadingData, setLoadingData] = useState(true);

	const app = useSelector((state: RootState) => state.app, shallowEqual);
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	// loading app
	useEffect(() => {
		dispatch(loadApp());
	}, [dispatch]);

	// loading data
	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const [{tags}, {articles}] = await Promise.all([
				callApi.get('/data/top-tags'),
				callApi.get('/data/top-articles'),
			]);

			setTopTags(tags);
			setTopArticles(articles);
			setLoadingData(false);
		};

		if (auth.userVerified) {
			fetchData();
		}
	}, [auth.userVerified]);

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
	const handleChangeTwoFactorAuth = async (): Promise<void> => {
		await dispatch(changeTwoFactorAuth());
	};
	const handleChangeThemeAnimations = (): void => {
		const newTheme = changeThemeAnimations();

		setTheme(newTheme);
	};

	const handleChangeTheme = (palette: PaletteOptions): void => {
		const newTheme = changeTheme(palette);

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
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalCss />

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
				<MobileDrawer open={mobileDrawer} close={(): void => setMobileDrawer(false)} />

				<main className='content'>
					<div className={classes.toolbar} />

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
						<Context.Provider
							value={{
								topTags,
								topArticles,
								loadingData,
							}}
						>
							{app.notFound ? <NotFound /> : children}
						</Context.Provider>
					</SnackbarProvider>
				</main>

				{!app.loading && auth.isAdmin && <AdminButton />}
				<ScrollButton open={scrollButton} />

				<ThemePickerModal
					open={themePickerModal}
					closeModal={(): void => setThemePickerModal(false)}
					handleChangeTheme={handleChangeTheme}
				/>
				<HotKeysModal open={hotKeysModal} closeModal={(): void => setHotKeysModal(false)} />
				<SettingsContext.Provider value={{handleChangeTwoFactorAuth, handleChangeThemeAnimations}}>
					<SettingsModal open={settingsModal} closeModal={(): void => setSettingsModal(false)} />
				</SettingsContext.Provider>
				<ExitModal
					open={exitModal}
					closeModal={(): void => setExitModal(false)}
					action={handleExit}
				/>

				<ChangeDrawer action={handleChangeDrawer} />
				<Exit action={handleExit} />
			</div>
		</ThemeProvider>
	);
};

export default App;
