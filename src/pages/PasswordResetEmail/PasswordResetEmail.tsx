import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';

import './style.scss';
import callApi from '@utils/callApi';

const PasswordResetEmail: React.FC = () => {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (!email.trim()) {
			return;
		}

		const data = await callApi.post('/auth/password_reset/email', {
			email,
		});

		if (data.success) {
			setSuccess(true);
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		console.log(email);
	};

	const _handleKeyPress = (e: React.KeyboardEvent): void => {
		if (e.key === 'Enter') {
			_handleSubmit();
		}
	};

	return (
		<section className='password-reset-email'>
			<Helmet>
				<title>Confirm email / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{success && <Typography variant='h5'>Check your email</Typography>}

			{!success && (
				<div className='form'>
					<Typography variant='h5' style={{marginBottom: 20}}>
						Confirm email
					</Typography>

					<TextField
						value={email}
						label='Email'
						className='input'
						variant='outlined'
						onChange={_handleChangeEmail}
						onKeyPress={_handleKeyPress}
					/>

					<Button variant='contained' color='primary' onClick={_handleSubmit} fullWidth>
						Submit
					</Button>
				</div>
			)}
		</section>
	);
};

export default PasswordResetEmail;
