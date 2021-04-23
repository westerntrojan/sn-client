import React, {useContext} from 'react';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {useSelector, shallowEqual} from 'react-redux';

import {RootState} from '@/store/types';

import SettingsContext from '@/App/SettingsContext';

const UserSettings: React.FC = () => {
	const {handleChangeTwoFactorAuth} = useContext(SettingsContext);

	const twoFactorAuth = useSelector(
		(state: RootState) => state.auth.user.twoFactorAuth,
		shallowEqual,
	);

	const _handleChangeTwoFactorAuth = () => {
		handleChangeTwoFactorAuth();
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
