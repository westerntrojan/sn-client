import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import {createMuiTheme} from '@material-ui/core/styles';
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
import PageLoader from '@components/PageLoader';
import NotFound from '@components/NotFound';
import {RootState} from '@store/types';
import {exit} from '@store/auth/actions';
import {loadApp} from '@store/app/actions';
import {getCurrentTheme} from '@utils/app';
import {ChangeDrawer, Exit} from '@utils/hotKeys';
import {IArticle} from '@store/types';
import callApi from '@utils/callApi';
import GlobalCss from './GlobalCss';
import Context from './context';
import SettingsContext from './SettingsContext';
import settings from './settings.json';

const useStyles = makeStyles(theme => ({
	toolbar: {...theme.mixins.toolbar},
	snackbar: {},
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
		fetchData();

		dispatch(loadApp());
	}, [dispatch]);

	useEffect(() => {
		const _handleScroll = (): void => {
			if (window.scrollY > 400) {
				setScrollButton(true);
			} else setScrollButton(false);
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

	const executeScrollUp = (): void => window.scrollTo({top: 0, behavior: 'smooth'});

	const changeTheme = (palette: PaletteOptions): void => {
		const newTheme = createMuiTheme({
			palette,
		});

		localStorage.setItem('theme', JSON.stringify(newTheme));

		setTheme(newTheme);
	};

	const changeThemeAnimations = (): void => {
		const currentTheme = JSON.parse(localStorage.getItem('theme') || '');
		const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || '');

		if (enableAnimations) {
			const newTheme = createMuiTheme({
				palette: currentTheme.palette,
				transitions: {
					create: (): string => 'none',
				},
				props: {
					MuiButtonBase: {
						disableRipple: true,
					},
				},
				overrides: {
					MuiCssBaseline: {
						'@global': {
							'*, *::before, *::after': {
								transition: 'none !important',
								animation: 'none !important',
							},
						},
					},
				},
			});

			localStorage.setItem('theme', JSON.stringify(newTheme));
			localStorage.setItem('enableAnimations', 'false');

			setTheme(newTheme);
		} else {
			const newTheme = createMuiTheme({
				palette: currentTheme.palette,
			});

			localStorage.setItem('theme', JSON.stringify(newTheme));
			localStorage.setItem('enableAnimations', 'true');

			setTheme(newTheme);
		}
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
							{app.loading ? <PageLoader /> : app.notFound ? <NotFound /> : children}
						</Context.Provider>
					</SnackbarProvider>
				</main>

				{auth.isAdmin && <AdminButton />}

				<ScrollButton open={scrollButton} action={executeScrollUp} />

				<ThemePickerModal
					open={themePickerModal}
					closeModal={(): void => setThemePickerModal(false)}
					changeTheme={changeTheme}
				/>
				<HotKeysModal open={hotKeysModal} closeModal={(): void => setHotKeysModal(false)} />
				<SettingsContext.Provider value={{changeThemeAnimations}}>
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
