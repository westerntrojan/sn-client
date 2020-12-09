import React from 'react';
import {useLocation} from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Dashboard from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import {Link as RouterLink} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import {useSelector, shallowEqual} from 'react-redux';
import PublicIcon from '@material-ui/icons/Public';

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
					to={'/feed'}
					selected={location.pathname === '/feed'}
				>
					<ListItemIcon>
						<DynamicFeedIcon />
					</ListItemIcon>
					<ListItemText primary={'Feed'} />
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
					to={'/global'}
					selected={location.pathname === '/global'}
				>
					<ListItemIcon>
						<PublicIcon />
					</ListItemIcon>
					<ListItemText primary={'Global chat'} />
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
							to={'/direct'}
							selected={location.pathname === '/direct'}
						>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary={'Direct messages'} />
						</ListItem>
						<ListItem
							button
							component={RouterLink}
							to={'/group'}
							selected={location.pathname === '/group'}
						>
							<ListItemIcon>
								<PeopleAltIcon />
							</ListItemIcon>
							<ListItemText primary={'Group'} />
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
