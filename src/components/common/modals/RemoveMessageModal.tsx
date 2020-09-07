import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

import {SubmitModal} from '@utils/hotKeys';

type Props = {
	selectedMessages: number;
	open: boolean;
	closeModal: () => void;
	action: () => void;
};

const RemoveMessageModal: React.FC<Props> = ({selectedMessages, open, action, closeModal}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Dialog
			open={open}
			onClose={closeModal}
			aria-labelledby='form-dialog-title'
			fullScreen={fullScreen}
		>
			<DialogContent>
				<DialogContentText>
					{selectedMessages > 1
						? `Do you want to remove ${selectedMessages} messages ?`
						: 'Do you want to remove this message ?'}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeModal} color='primary'>
					Cancel
				</Button>
				<Button onClick={action} color='secondary'>
					Remove
				</Button>
			</DialogActions>

			<SubmitModal action={action} />
		</Dialog>
	);
};

export default RemoveMessageModal;
