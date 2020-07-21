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
import ForumIcon from '@material-ui/icons/Forum';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {useSelector, shallowEqual} from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import {AppState} from '@store/types';

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
	toolbar: {...theme.mixins.toolbar},
}));

const AlterDrawer: React.FC = () => {
	const classes = useStyles();

	const location = useLocation();

	const auth = useSelector((state: AppState) => state.auth, shallowEqual);
	const appLoading = useSelector((state: AppState) => state.app.loading, shallowEqual);

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
					<List>
						<ListItem button selected={isSelected('/')} component={RouterLink} to={'/'}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={'Home'} />
						</ListItem>
						<ListItem button selected={isSelected('/chat')} component={RouterLink} to={'/chat'}>
							<ListItemIcon>
								<ForumIcon />
							</ListItemIcon>
							<ListItemText primary={'Chat'} />
						</ListItem>

						{auth.isAuth && (
							<>
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

								<ListItem
									button
									selected={isSelected('/messages')}
									component={RouterLink}
									to={'/messages'}
								>
									<ListItemIcon>
										<PeopleAltIcon />
									</ListItemIcon>
									<ListItemText primary={'Messages'} />
								</ListItem>
							</>
						)}
					</List>
				)}
			</div>
		</Drawer>
	);
};

export default AlterDrawer;
