import React from 'react';
import {useLocation} from 'react-router';
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
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import {useSelector, shallowEqual} from 'react-redux';

import {RootState} from '@store/types';

const Navigation: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const location = useLocation();

	return (
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
					to={'/subscriptions'}
					selected={location.pathname === '/subscriptions'}
				>
					<ListItemIcon>
						<SubscriptionsIcon />
					</ListItemIcon>
					<ListItemText primary={'Subscriptions'} />
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
							to='/example'
							selected={location.pathname === '/example'}
						>
							<ListItemIcon>
								<Brightness1Icon />
							</ListItemIcon>
							<ListItemText primary='Example' />
						</ListItem>
					</List>
				</>
			)}
		</>
	);
};

export default Navigation;
