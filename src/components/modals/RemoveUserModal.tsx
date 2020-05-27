import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

import {SubmitModal} from '@utils/hotKeys';

type Props = {
	open: boolean;
	closeModal: () => void;
	action: () => void;
};

const RemoveUserModal: React.FC<Props> = ({open, action, closeModal}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [loading, setLoading] = useState(false);

	const _handleAction = (): void => {
		setLoading(true);

		action();
	};

	return (
		<Dialog
			open={open}
			onClose={!loading ? closeModal : undefined}
			aria-labelledby='form-dialog-title'
			fullScreen={fullScreen}
		>
			<DialogTitle id='form-dialog-title'>Are you absolutely sure ?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This action cannot be undone. Are you sure you want to delete this ?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeModal} disabled={loading} color='primary'>
					Cancel
				</Button>
				<Button color='secondary' disabled={loading} onClick={_handleAction}>
					Remove
				</Button>
			</DialogActions>

			<SubmitModal action={_handleAction} />
		</Dialog>
	);
};

export default RemoveUserModal;
