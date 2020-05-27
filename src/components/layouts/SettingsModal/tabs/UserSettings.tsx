import React, {useState} from 'react';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const UserSettings: React.FC = () => {
	const [twoFactorAuth, setTwoFactorAuth] = useState(false);

	const _handleChangeTwoFactorAuth = (): void => {
		setTwoFactorAuth(!twoFactorAuth);
	};

	return (
		<List>
			<ListItem button onClick={_handleChangeTwoFactorAuth}>
				<ListItemText primary='Two factor authentication' />

				<ListItemSecondaryAction>
					<Switch checked={twoFactorAuth} color='primary' onChange={_handleChangeTwoFactorAuth} />
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	);
};

export default UserSettings;
