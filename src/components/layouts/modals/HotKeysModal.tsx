import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import settings from '@App/settings.json';

const useStyles = makeStyles(theme => ({
	dialogTitle: {
		margin: 0,
		paddingTop: theme.spacing(2),
		paddingBotttom: theme.spacing(2),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
	},
	closeIcon: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
}));

type Props = {
	open: boolean;
	closeModal: () => void;
};

const HotKeysModal: React.FC<Props> = ({open, closeModal}) => {
	const classes = useStyles();
	const size = {
		large: useMediaQuery(`(min-width:${settings.display.large})`),
	};
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen}>
			<DialogTitle className={classes.dialogTitle} disableTypography>
				<Typography variant='h6'>Hot keys</Typography>

				<IconButton className={classes.closeIcon} onClick={closeModal} color='primary'>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<List>
					{size.large && (
						<ListItem>
							<ListItemText primary='CTRL + B' secondary='Open/Close drawer' />
						</ListItem>
					)}
					<ListItem>
						<ListItemText primary='CTRL + Q' secondary='Sign out' />
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
