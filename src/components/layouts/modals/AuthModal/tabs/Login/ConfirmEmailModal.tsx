import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';

import {SubmitModal} from '@utils/hotKeys';
import callApi from '@utils/callApi';

type Props = {
	open: boolean;
	closeModal: () => void;
};

const ConfigEmailModal: React.FC<Props> = ({open, closeModal}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (!email.trim()) {
			return;
		}

		setLoading(true);

		const passwordResetUri =
			window.location.protocol + '//' + window.location.host + '/password_reset/verify';

		const data = await callApi.post('/auth/password_reset/email', {
			email,
			passwordResetUri,
		});

		if (data.success) {
			setSuccess(true);
		} else {
			setLoading(false);
			enqueueSnackbar(data.message, {variant: 'error'});
		}
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen} fullWidth>
			<DialogTitle>Confirm email</DialogTitle>

			{success && (
				<DialogContent>
					<DialogContentText>Check your email</DialogContentText>
				</DialogContent>
			)}

			{!success && (
				<>
					<DialogContent>
						<DialogContentText>
							To receive a new password, enter the email address used during registration in the
							field below
						</DialogContentText>

						<TextField
							label='Email'
							value={email}
							onChange={_handleChangeEmail}
							onKeyPress={_handleKeyPressInput}
							disabled={loading}
							autoFocus
							fullWidth
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={closeModal} color='primary' disabled={loading}>
							Cancel
						</Button>
						<Button onClick={_handleSubmit} color='primary' disabled={loading}>
							Submit
						</Button>
					</DialogActions>
				</>
			)}

			<SubmitModal action={_handleSubmit} />
		</Dialog>
	);
};

export default ConfigEmailModal;
