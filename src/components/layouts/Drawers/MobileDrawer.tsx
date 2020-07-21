import React from 'react';
import {useLocation} from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ForumIcon from '@material-ui/icons/Forum';
import {useTheme} from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {useSelector, shallowEqual} from 'react-redux';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import Footer from './Footer';
import BottomTabs from './BottomTabs';
import {AppState} from '@store/types';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	list: {
		height: '100%',
		width: drawerWidth,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

type Props = {
	open: boolean;
	close: () => void;
};

const MobileDrawer: React.FC<Props> = ({open, close}) => {
	const title = process.env.REACT_APP_TITLE;

	const classes = useStyles();
	const theme = useTheme();

	const location = useLocation();

	const auth = useSelector((state: AppState) => state.auth, shallowEqual);

	return (
		<Drawer open={open} onClose={close}>
			<AppBar position='static' color={theme.palette.type === 'light' ? 'primary' : 'default'}>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='Close drawer'
						onClick={close}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h5' noWrap onClick={close}>
						<Link underline='none' component={RouterLink} to='/' color={'inherit'}>
							{title}
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>

			<div className={classes.list}>
				<List>
					<ListItem
						button
						onClick={close}
						selected={location.pathname === '/'}
						component={RouterLink}
						to={'/'}
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
					<ListItem
						button
						onClick={close}
						selected={location.pathname === '/chat'}
						component={RouterLink}
						to={'/chat'}
					>
						<ListItemIcon>
							<ForumIcon />
						</ListItemIcon>
						<ListItemText primary={'Chat'} />
					</ListItem>
				</List>

				{auth.isAuth && (
					<>
						<Divider />

						<List>
							<ListItem
								button
								component={RouterLink}
								selected={location.pathname === '/article/add'}
								to={'/article/add'}
								onClick={close}
							>
								<ListItemIcon>
									<AddBoxIcon />
								</ListItemIcon>
								<ListItemText primary={'Add article'} />
							</ListItem>
							<ListItem
								button
								selected={location.pathname === '/messages'}
								component={RouterLink}
								to={'/messages'}
								onClick={close}
							>
								<ListItemIcon>
									<PeopleAltIcon />
								</ListItemIcon>
								<ListItemText primary={'Messages'} />
							</ListItem>
						</List>
					</>
				)}
				{auth.isAdmin && (
					<>
						<Divider />

						<List>
							<ListItem
								button
								component={RouterLink}
								selected={location.pathname === '/admin'}
								to={'/admin'}
								onClick={close}
							>
								<ListItemIcon>
									<Dashboard />
								</ListItemIcon>
								<ListItemText primary={'Admin'} />
							</ListItem>

							<ListItem
								button
								component={RouterLink}
								selected={location.pathname === '/test'}
								to={'/test'}
								onClick={close}
							>
								<ListItemIcon>
									<Brightness1Icon />
								</ListItemIcon>
								<ListItemText primary={'Test'} />
							</ListItem>
						</List>
					</>
				)}
			</div>

			<BottomTabs />
			<Footer />
		</Drawer>
	);
};

export default MobileDrawer;
