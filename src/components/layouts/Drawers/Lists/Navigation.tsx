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
import MessageIcon from '@material-ui/icons/Message';

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
	};
};

const Navigation: React.FC<Props> = ({auth}) => {
	const location = useLocation();

	return (
		<>
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
			</List>

			{auth.isAuth && (
				<>
					<Divider />

					<List>
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
					</List>
				</>
			)}

			{auth.isAdmin && (
				<>
					<Divider />

					<List>
						<ListItem
							button
							selected={location.pathname === '/admin'}
							component={RouterLink}
							to={'/admin'}
						>
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
