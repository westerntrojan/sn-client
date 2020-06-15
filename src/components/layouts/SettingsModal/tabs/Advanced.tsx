import React, {useState, useContext} from 'react';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SettingsContext from '@App/SettingsContext';

const Advanced: React.FC = () => {
	const [enableAnimations, setEnableAnimations] = useState(
		JSON.parse(localStorage.getItem('enableAnimations') || ''),
	);

	const {changeThemeAnimations} = useContext(SettingsContext);

	const _handleChangeTwoFactorAuth = (): void => {
		setEnableAnimations(!enableAnimations);

		changeThemeAnimations();
	};

	return (
		<List>
			<ListItem button onClick={_handleChangeTwoFactorAuth}>
				<ListItemText primary='Enable animations' />

				<ListItemSecondaryAction>
					<Switch
						checked={enableAnimations}
						color='primary'
						onChange={_handleChangeTwoFactorAuth}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	);
};

export default Advanced;
