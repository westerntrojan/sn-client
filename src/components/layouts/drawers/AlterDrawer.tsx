import React from 'react';
import {useLocation} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useSelector, shallowEqual} from 'react-redux';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PersonIcon from '@material-ui/icons/Person';
import Skeleton from '@material-ui/lab/Skeleton';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ZoomTooltip from '@/components/common/tooltips/ZoomTooltip';
import Divider from '@material-ui/core/Divider';
import PublicIcon from '@material-ui/icons/Public';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import {RootState} from '@/store/types';

const useStyles = makeStyles(theme => ({
	drawer: {
		width: theme.spacing(7) + 1,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerPaper: {
		width: theme.spacing(7) + 1,
		overflowX: 'hidden',
	},
	list: {
		height: '100%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbar: {
		...theme.mixins.toolbar,
		boxShadow: 'none',
	},
}));

const AlterDrawer: React.FC = () => {
	const classes = useStyles();

	const location = useLocation();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const appLoading = useSelector((state: RootState) => state.app.loading, shallowEqual);

	const isSelected = (path: string): boolean => {
		return location.pathname === path;
	};

	return (
		<Drawer
			className={classes.drawer}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar} />

			<div className={classes.list}>
				{appLoading ? (
					<List>
						<ListItem style={{padding: 0, paddingBottom: 15}}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem style={{padding: 0, paddingBottom: 15}}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem style={{padding: 0, paddingBottom: 15}}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>

						<ListItem style={{padding: 0, paddingBottom: 15}}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
					</List>
				) : (
					<>
						<List>
							<ZoomTooltip title='Home' placement='right'>
								<ListItem button selected={isSelected('/')} component={RouterLink} to={'/'}>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary={'Home'} />
								</ListItem>
							</ZoomTooltip>
							<ZoomTooltip title='Feed' placement='right'>
								<ListItem button selected={isSelected('/feed')} component={RouterLink} to={'/feed'}>
									<ListItemIcon>
										<DynamicFeedIcon />
									</ListItemIcon>
									<ListItemText primary={'Feed'} />
								</ListItem>
							</ZoomTooltip>
							<ZoomTooltip title='Bookmars' placement='right'>
								<ListItem
									button
									selected={isSelected('/bookmarks')}
									component={RouterLink}
									to={'/bookmarks'}
								>
									<ListItemIcon>
										<BookmarksIcon />
									</ListItemIcon>
									<ListItemText primary={'Bookmarks'} />
								</ListItem>
							</ZoomTooltip>
							<ZoomTooltip title='Global chat' placement='right'>
								<ListItem
									button
									selected={isSelected('/global')}
									component={RouterLink}
									to={'/global'}
								>
									<ListItemIcon>
										<PublicIcon />
									</ListItemIcon>
									<ListItemText primary={'Global chat'} />
								</ListItem>
							</ZoomTooltip>
						</List>

						{auth.isAuth && (
							<>
								<Divider />

								<List>
									<ZoomTooltip title='Add article' placement='right'>
										<ListItem
											button
											selected={isSelected('/article/add')}
											component={RouterLink}
											to={'/article/add'}
										>
											<ListItemIcon>
												<AddBoxIcon />
											</ListItemIcon>
											<ListItemText primary={'Add article'} />
										</ListItem>
									</ZoomTooltip>

									<ZoomTooltip title='Direct messages' placement='right'>
										<ListItem
											button
											selected={isSelected('/direct')}
											component={RouterLink}
											to={'/direct'}
										>
											<ListItemIcon>
												<PersonIcon />
											</ListItemIcon>
											<ListItemText primary={'Direct messages'} />
										</ListItem>
									</ZoomTooltip>

									<ZoomTooltip title='Group' placement='right'>
										<ListItem
											button
											selected={isSelected('/group')}
											component={RouterLink}
											to={'/group'}
										>
											<ListItemIcon>
												<PeopleAltIcon />
											</ListItemIcon>
											<ListItemText primary={'Group'} />
										</ListItem>
									</ZoomTooltip>
								</List>
							</>
						)}
					</>
				)}
			</div>
		</Drawer>
	);
};

export default AlterDrawer;
