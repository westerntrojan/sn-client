import React from 'react';
import {useLocation} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {useSelector, shallowEqual} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ForumIcon from '@material-ui/icons/Forum';
import Dashboard from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import {Link as RouterLink} from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import {AppState} from '@store/types';
import Footer from './Footer';

const drawerWidth = 240;

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
	toolbar: {...theme.mixins.toolbar},
}));

const MainDrawer: React.FC = () => {
	const classes = useStyles();

	const location = useLocation();

	const auth = useSelector((state: AppState) => state.auth, shallowEqual);
	const app = useSelector((state: AppState) => state.app, shallowEqual);

	return (
		<Drawer
			className={classes.root}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar} />

			{app.loading ? null : (
				<>
					<div className={classes.list}>
						<List>
							<ListItem button component={RouterLink} to={'/'} selected={location.pathname === '/'}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary={'Home'} />
							</ListItem>
							<ListItem
								button
								component={RouterLink}
								to={'/chat'}
								selected={location.pathname === '/chat'}
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
										to={'/article/add'}
										selected={location.pathname === '/article/add'}
									>
										<ListItemIcon>
											<AddBoxIcon />
										</ListItemIcon>
										<ListItemText primary={'Add article'} />
									</ListItem>

									<ListItem
										button
										component={RouterLink}
										to={'/messages'}
										selected={location.pathname === '/messages'}
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
										to={'/admin'}
										selected={location.pathname === '/admin'}
									>
										<ListItemIcon>
											<Dashboard />
										</ListItemIcon>
										<ListItemText primary={'Admin'} />
									</ListItem>

									<ListItem
										button
										component={RouterLink}
										to={'/test'}
										selected={location.pathname === '/test'}
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

					<Footer />
				</>
			)}
		</Drawer>
	);
};

export default MainDrawer;
