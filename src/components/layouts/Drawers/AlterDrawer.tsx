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
import MessageIcon from '@material-ui/icons/Message';

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

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
	};
};

const AlterDrawer: React.FC<Props> = ({auth}) => {
	const classes = useStyles();

	const location = useLocation();

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
				<List>
					<ListItem button selected={location.pathname === '/'} component={RouterLink} to={'/'}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
					<ListItem
						button
						selected={location.pathname === '/chat'}
						component={RouterLink}
						to={'/chat'}
					>
						<ListItemIcon>
							<ForumIcon />
						</ListItemIcon>
						<ListItemText primary={'Chat'} />
					</ListItem>

					{auth.isAuth && (
						<>
							<ListItem
								button
								selected={location.pathname === '/article/add'}
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
								selected={location.pathname === '/messages'}
								component={RouterLink}
								to={'/messages'}
							>
								<ListItemIcon>
									<MessageIcon />
								</ListItemIcon>
								<ListItemText primary={'Messages'} />
							</ListItem>
						</>
					)}
				</List>
			</div>
		</Drawer>
	);
};

export default AlterDrawer;
