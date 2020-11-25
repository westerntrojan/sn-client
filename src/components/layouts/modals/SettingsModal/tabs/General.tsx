import React from 'react';
import TranslateIcon from '@material-ui/icons/Translate';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const General: React.FC = () => {
	return (
		<List>
			<ListItem button>
				<ListItemIcon>
					<TranslateIcon />
				</ListItemIcon>

				<ListItemText primary={'Language'} />
			</ListItem>
		</List>
	);
};

export default General;
