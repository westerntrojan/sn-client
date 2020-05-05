import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

import {TextButton} from '@components/SubmitButtons';
import {SubmitModal} from '@utils/hotKeys';

type Props = {
	open: boolean;
	text: string;
	action: () => void;
	closeModal: () => void;
};

const RemoveModal: React.FC<Props> = ({open, text, action, closeModal}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!open) {
			setLoading(false);
		}
	}, [open]);

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
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeModal} disabled={loading} color='primary'>
					Cancel
				</Button>
				<TextButton color='secondary' disabled={loading} loading={loading} onClick={_handleAction}>
					Remove
				</TextButton>
			</DialogActions>

			<SubmitModal action={_handleAction} />
		</Dialog>
	);
};

export default RemoveModal;
