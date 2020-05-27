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
import PersonIcon from '@material-ui/icons/Person';

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
	};
};

const Navigation: React.FC<Props> = ({auth}) => {
	const location = useLocation();

	const activeRoute = (routeName: string): boolean => {
		return location.pathname === routeName ? true : false;
	};

	return (
		<>
			<List>
				<ListItem button component={RouterLink} to={'/'} selected={activeRoute('/')}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<ListItem button component={RouterLink} to={'/chat'} selected={activeRoute('/chat')}>
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
							selected={activeRoute('/article/add')}
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
							selected={activeRoute('/messages')}
						>
							<ListItemIcon>
								<PersonIcon />
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
						<ListItem button component={RouterLink} to={'/admin'} selected={activeRoute('/admin')}>
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
