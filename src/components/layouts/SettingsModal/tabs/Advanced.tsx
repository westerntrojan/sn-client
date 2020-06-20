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

	const {handleChangeThemeAnimations} = useContext(SettingsContext);

	const _handleChangeThemeAnimations = (): void => {
		setEnableAnimations(!enableAnimations);

		handleChangeThemeAnimations();
	};

	return (
		<List>
			<ListItem button onClick={_handleChangeThemeAnimations}>
				<ListItemText primary='Enable animations' />

				<ListItemSecondaryAction>
					<Switch
						checked={enableAnimations}
						color='primary'
						onChange={_handleChangeThemeAnimations}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	);
};

export default Advanced;
