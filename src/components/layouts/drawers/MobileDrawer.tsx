import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import {useTheme} from '@material-ui/core/styles';
import {useLocation} from 'react-router';

import Footer from './components/Footer';
import BottomTabs from './components/BottomTabs';
import {Navigation, Messages, Groups} from './components/tabs';

const drawerWidth = 245;

const useStyles = makeStyles(theme => ({
	root: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerPaper: {
		width: drawerWidth,
		overflowX: 'hidden',
	},
	list: {
		height: '100%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

type Props = {
	open: boolean;
	closeDrawer: () => void;
};

const MobileDrawer: React.FC<Props> = ({open, closeDrawer}) => {
	const title = process.env.REACT_APP_TITLE;

	const classes = useStyles();
	const theme = useTheme();

	const [tab, setTab] = useState(0);

	const location = useLocation();

	const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string): void => {
		setTab(Number(newValue));
	};

	useEffect(() => {
		closeDrawer();

		// eslint-disable-next-line
	}, [location]);

	return (
		<Drawer
			open={open}
			onClose={closeDrawer}
			className={classes.root}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<AppBar position='static' color={theme.palette.type === 'light' ? 'primary' : 'default'}>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						onClick={closeDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h5' noWrap>
						<Link underline='none' component={RouterLink} to='/' color={'inherit'}>
							{title}
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.list}>
				{tab === 0 && <Navigation />}

				{tab === 1 && <Messages />}

				{tab === 2 && <Groups />}
			</div>

			<BottomTabs value={tab} onChange={handleChangeTab} />
			<Footer />
		</Drawer>
	);
};

export default MobileDrawer;
