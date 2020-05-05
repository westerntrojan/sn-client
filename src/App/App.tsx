import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useLocation} from 'react-router';
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
import ExitModal from '@components/layouts/ExitModal';
import ScrollButton from '@components/ScrollButton';
import PageLoader from '@components/PageLoader';
import NotFound from '@components/NotFound';
import {RootState} from '@store/types';
import {exit} from '@store/auth/actions';
import {loadApp, withDrawer, notDrawer} from '@store/app/actions';
import {drawer, getCurrentTheme} from '@utils/app';
import {ChangeDrawer, Exit} from '@utils/hotKeys';
import {IArticle} from '@store/types';
import callApi from '@utils/callApi';
import Context from './context';
import setting from './setting.json';

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
		small: useMediaQuery(`(max-width:${setting.display.small})`),
		large: useMediaQuery(`(min-width:${setting.display.large})`),
	};

	const classes = useStyles();

	const location = useLocation();

	const [themePickerModal, setThemePickerModal] = useState(false);
	const [hotKeysModal, setHotKeysModal] = useState(false);
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
		if (drawer(location)) {
			dispatch(withDrawer());
		} else {
			dispatch(notDrawer());
		}

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

		return (): void => {
			window.removeEventListener('scroll', _handleScroll);
			document.removeEventListener('keydown', _handleKey);
		};
	}, [dispatch, location]);

	const executeScrollUp = (): void => window.scrollTo({top: 0, behavior: 'smooth'});

	const openThemePickerModal = (): void => {
		setThemePickerModal(true);
	};

	const openHotKeysModal = (): void => {
		setHotKeysModal(true);
	};

	const openExitModal = (): void => {
		setExitModal(true);
	};

	const closeExitModal = (): void => {
		setExitModal(false);
	};

	const changeTheme = (palette: PaletteOptions): void => {
		const theme = createMuiTheme({
			palette,
		});

		localStorage.setItem('theme', JSON.stringify(theme));

		setTheme(theme);
	};

	const handleChangeDrawer = (): void => {
		alterDrawer ? setAlterDrawer(false) : setAlterDrawer(true);
	};

	const openMobileDrawer = (): void => {
		setMobileDrawer(true);
	};

	const handleExit = (): void => {
		closeExitModal();

		dispatch(exit());
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<div id='root'>
				<Header
					auth={auth}
					openDrawer={
						size['large'] ? (app.drawer ? handleChangeDrawer : openMobileDrawer) : openMobileDrawer
					}
					openThemePickerModal={openThemePickerModal}
					openHotKeysModal={openHotKeysModal}
					exit={openExitModal}
				/>

				{app.drawer && size['large'] && (
					<>{alterDrawer ? <AlterDrawer auth={auth} /> : <MainDrawer auth={auth} />}</>
				)}
				{app.drawer && !size['large'] && !size['small'] && <AlterDrawer auth={auth} />}
				<MobileDrawer
					open={mobileDrawer}
					closeDrawer={(): void => setMobileDrawer(false)}
					auth={auth}
				/>

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
						<Context.Provider value={{topTags, topArticles, loading: loadingData}}>
							{app.loading ? <PageLoader /> : app.notFound ? <NotFound /> : children}
						</Context.Provider>
					</SnackbarProvider>
				</main>

				<ScrollButton open={scrollButton} action={executeScrollUp} />
				<ThemePickerModal
					open={themePickerModal}
					closeModal={(): void => setThemePickerModal(false)}
					changeTheme={changeTheme}
				/>
				<HotKeysModal open={hotKeysModal} closeModal={(): void => setHotKeysModal(false)} />
				<ExitModal open={exitModal} closeModal={closeExitModal} action={handleExit} />

				<ChangeDrawer action={handleChangeDrawer} />
				<Exit action={handleExit} />
			</div>
		</ThemeProvider>
	);
};

export default App;
