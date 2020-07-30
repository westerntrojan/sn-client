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
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Skeleton from '@material-ui/lab/Skeleton';

import {RootState} from '@store/types';
import Footer from './Footer';
import BottomTabs from './BottomTabs';

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
	skeletonListItem: {
		padding: 0,
		paddingBottom: 15,
	},
}));

const MainDrawer: React.FC = () => {
	const classes = useStyles();

	const location = useLocation();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const appLoading = useSelector((state: RootState) => state.app.loading, shallowEqual);

	return (
		<Drawer
			className={classes.root}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar} />

			<div className={classes.list}>
				{appLoading ? (
					<List>
						<ListItem className={classes.skeletonListItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem className={classes.skeletonListItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem className={classes.skeletonListItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem className={classes.skeletonListItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem className={classes.skeletonListItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem className={classes.skeletonListItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
					</List>
				) : (
					<>
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
							<ListItem
								button
								component={RouterLink}
								to={'/bookmarks'}
								selected={location.pathname === '/bookmarks'}
							>
								<ListItemIcon>
									<BookmarksIcon />
								</ListItemIcon>
								<ListItemText primary={'Bookmarks'} />
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
					</>
				)}
			</div>

			<BottomTabs />
			<Footer />
		</Drawer>
	);
};

export default MainDrawer;
