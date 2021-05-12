import React from 'react';
import {useLocation} from 'react-router-dom';
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
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import {useSelector, shallowEqual} from 'react-redux';
import PublicIcon from '@material-ui/icons/Public';

import {RootState} from '@/store/types';

const Navigation: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const location = useLocation();

	const isSelected = (path: string): boolean => {
		return location.pathname === path;
	};

	return (
		<>
			<List>
				<ListItem button component={RouterLink} to={'/'} selected={isSelected('/')}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<ListItem button component={RouterLink} to={'/feed'} selected={isSelected('/feed')}>
					<ListItemIcon>
						<DynamicFeedIcon />
					</ListItemIcon>
					<ListItemText primary={'Feed'} />
				</ListItem>
				<ListItem
					button
					component={RouterLink}
					to={'/bookmarks'}
					selected={isSelected('/bookmarks')}
				>
					<ListItemIcon>
						<BookmarksIcon />
					</ListItemIcon>
					<ListItemText primary={'Bookmarks'} />
				</ListItem>
				<ListItem button component={RouterLink} to={'/global'} selected={isSelected('/global')}>
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
							selected={isSelected('/article/add')}
						>
							<ListItemIcon>
								<AddBoxIcon />
							</ListItemIcon>
							<ListItemText primary={'Add article'} />
						</ListItem>

						<ListItem button component={RouterLink} to={'/direct'} selected={isSelected('/direct')}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary={'Direct messages'} />
						</ListItem>
						<ListItem button component={RouterLink} to={'/group'} selected={isSelected('/group')}>
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
						<ListItem button component={RouterLink} to={'/admin'} selected={isSelected('/admin')}>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary={'Admin'} />
						</ListItem>
					</List>
				</>
			)}
		</>
	);
};

export default Navigation;
