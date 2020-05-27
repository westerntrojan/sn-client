import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import settings from '@App/settings.json';

type Props = {
	open: boolean;
	closeModal: () => void;
};

const HotKeysModal: React.FC<Props> = ({open, closeModal}) => {
	const size = {
		large: useMediaQuery(`(min-width:${settings.display.large})`),
	};

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen}>
			<DialogTitle>Hot keys</DialogTitle>

			<DialogContent>
				<List>
					{size.large && (
						<ListItem>
							<ListItemText primary='CTRL + B' secondary='Open/Close drawer' />
						</ListItem>
					)}
					<ListItem>
						<ListItemText primary='CTRL + Q' secondary='Exit' />
					</ListItem>
					<ListItem>
						<ListItemText primary='/' secondary='Search focus' />
					</ListItem>
					<ListItem>
						<ListItemText primary='DEL' secondary='Remove selected message' />
					</ListItem>
				</List>
			</DialogContent>
		</Dialog>
	);
};

export default HotKeysModal;
