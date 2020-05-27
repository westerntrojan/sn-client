import React, {useState, useRef} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {useLocation} from 'react-router';
import PaletteIcon from '@material-ui/icons/Palette';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useTheme} from '@material-ui/core/styles';
import {AuthState} from '@store/auth/types';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import UserAvatar from '@components/avatars/UserAvatar';
import {userLink} from '@utils/users';
import {SearchFocus} from '@utils/hotKeys';
import ZoomTooltip from '@components/tooltips/ZoomTooltip';

const useStyles = makeStyles(theme => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,
	},
	grow: {
		flexGrow: 1,
	},
	signInButton: {
		marginLeft: 10,
	},
	avatar: {
		marginLeft: 10,
		cursor: 'pointer',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 160,
			'&:focus': {
				width: 220,
			},
		},
	},
	rightSide: {
		display: 'flex',
		alignItems: 'center',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

type Props = {
	auth: AuthState;
	openDrawer: () => void;
	openThemePickerModal: () => void;
	openHotKeysModal: () => void;
	openSettingsModal: () => void;
	exit: () => void;
};

const Header: React.FC<Props> = ({
	auth,
	openDrawer,
	openThemePickerModal,
	openHotKeysModal,
	openSettingsModal,
	exit,
}) => {
	const classes = useStyles();
	const theme = useTheme();

	const title = process.env.REACT_APP_TITLE;

	const location = useLocation();

	const searchRef = useRef<HTMLInputElement>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLButtonElement | null>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = (): void => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = (): void => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleAppearance = (): void => {
		handleMenuClose();
		handleMobileMenuClose();

		openThemePickerModal();
	};

	const handleProfileMenuOpen = (e: React.MouseEvent<HTMLDivElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const handleFoucs = (): void => {
		if (searchRef.current) {
			searchRef.current.focus();
		}
	};

	const handleMobileMenuOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setMobileMoreAnchorEl(e.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = auth.user && (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			id={menuId}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link underline='none' component={RouterLink} to={userLink(auth.user)} color={'inherit'}>
				<MenuItem onClick={handleMenuClose}>My profile</MenuItem>
			</Link>

			<MenuItem
				onClick={(): void => {
					exit();
					handleMenuClose();
				}}
			>
				Exit
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{auth.isAuth ? (
				<div>
					<Link underline='none' component={RouterLink} to={userLink(auth.user)} color={'inherit'}>
						<MenuItem onClick={handleMenuClose}>
							<IconButton>
								<AccountCircle />
							</IconButton>
							<p>My profile</p>
						</MenuItem>
					</Link>
					<MenuItem onClick={(): void => console.log('notification')}>
						<IconButton>
							<NotificationsIcon />
						</IconButton>
						<p>Notification</p>
					</MenuItem>
					<MenuItem onClick={handleAppearance}>
						<IconButton>
							<PaletteIcon />
						</IconButton>
						<p>Change theme</p>
					</MenuItem>
					<MenuItem onClick={openSettingsModal}>
						<IconButton>
							<SettingsIcon />
						</IconButton>
						<p>Settings</p>
					</MenuItem>
					<MenuItem
						onClick={(): void => {
							handleMenuClose();
							exit();
						}}
					>
						<IconButton>
							<ExitToAppIcon />
						</IconButton>
						<p>Exit</p>
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem onClick={handleAppearance}>
						<IconButton>
							<PaletteIcon />
						</IconButton>
						<p>Change theme</p>
					</MenuItem>
					<MenuItem onClick={(): void => console.log('settings')}>
						<IconButton>
							<SettingsIcon />
						</IconButton>
						<p>Settings</p>
					</MenuItem>
					<Link
						underline='none'
						component={RouterLink}
						to={{pathname: '/auth', state: {from: location}}}
						color='inherit'
					>
						<MenuItem onClick={handleMenuClose}>
							<IconButton>
								<AccountCircle />
							</IconButton>
							<p>Sign in</p>
						</MenuItem>
					</Link>
				</div>
			)}
		</Menu>
	);

	return (
		<header className={classes.root}>
			<div className={classes.grow}>
				<AppBar position='fixed' color={theme.palette.type === 'light' ? 'primary' : 'default'}>
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							aria-label='Open drawer'
							onClick={openDrawer}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant='h5' noWrap>
							<Link underline='none' component={RouterLink} to='/' color={'inherit'}>
								{title}
							</Link>
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search ("/" to focus)'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								type='search'
								inputRef={searchRef}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<div className={classes.rightSide}>
								<ZoomTooltip title='Hot keys'>
									<IconButton onClick={openHotKeysModal} color='inherit'>
										<KeyboardIcon />
									</IconButton>
								</ZoomTooltip>
								<ZoomTooltip title='Change theme'>
									<IconButton onClick={handleAppearance} color='inherit'>
										<PaletteIcon />
									</IconButton>
								</ZoomTooltip>
								<ZoomTooltip title='Settings'>
									<IconButton onClick={openSettingsModal} color='inherit'>
										<SettingsIcon />
									</IconButton>
								</ZoomTooltip>
								{auth.isAuth ? (
									<>
										<ZoomTooltip title='Notification'>
											<IconButton onClick={(): void => console.log('notification')} color='inherit'>
												<Badge badgeContent={17} color='secondary'>
													<NotificationsIcon />
												</Badge>
											</IconButton>
										</ZoomTooltip>
										<UserAvatar
											user={auth.user}
											className={classes.avatar}
											onClick={handleProfileMenuOpen}
										/>
									</>
								) : (
									<Link
										underline='none'
										component={RouterLink}
										to={{pathname: '/auth', state: {from: location}}}
										color={'inherit'}
									>
										<Button
											variant='outlined'
											className={classes.signInButton}
											startIcon={<AccountCircle />}
											color='inherit'
										>
											Sign in
										</Button>
									</Link>
								)}
							</div>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label='Show more'
								aria-controls={mobileMenuId}
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='inherit'
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
			</div>

			<SearchFocus action={handleFoucs} />
		</header>
	);
};

export default Header;
