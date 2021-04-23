import React, {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import {useSnackbar} from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Context from '@/components/layouts/modals/AuthModal/context';

type Props = {
	open: boolean;
	closeModal: () => void;
	rememberMe: boolean;
};

const CodeModal: React.FC<Props> = ({open, closeModal, rememberMe}) => {
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const {handleSubmitCode} = useContext(Context);

	const {enqueueSnackbar} = useSnackbar();

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const _handleChangeCode = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		setCode(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (code.length !== 6) {
			return;
		}

		setLoading(true);

		const data = await handleSubmitCode({code, rememberMe});

		if (!data.success) {
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
		<Dialog open={open} fullScreen={fullScreen}>
			<DialogTitle>Verify code</DialogTitle>

			<DialogContent>
				<DialogContentText>
					Please enter the code you've just received in your email.
				</DialogContentText>

				<TextField
					label='6 digit code'
					value={code}
					disabled={loading}
					onChange={_handleChangeCode}
					onKeyPress={_handleKeyPressInput}
					fullWidth
					autoFocus
					inputProps={{
						maxLength: 6,
					}}
				/>
			</DialogContent>

			<DialogActions>
				<Button color='primary' disabled={loading} onClick={closeModal}>
					Cancel
				</Button>
				<Button color='primary' disabled={loading} onClick={_handleSubmit}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CodeModal;
