import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Typography from '@material-ui/core/Typography';
import {useSnackbar} from 'notistack';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './style.scss';
import callApi from '@utils/callApi';
import Loader from '@components/Loader';

const PasswordResetVerify: React.FC = () => {
	const [verified, setVerified] = useState(false);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [success, setSuccess] = useState(false);

	const {token} = useParams();

	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		const validateToken = async (): Promise<void> => {
			const data = await callApi.get(`/auth/password_reset/verify?token=${token}`);

			if (data.success) {
				setVerified(true);
			}

			setLoading(false);
		};
		validateToken();
	}, [token]);

	const _handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
	};

	const _handleChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setRepeatPassword(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (!password.trim() || !repeatPassword.trim() || password !== repeatPassword) {
			return;
		}

		const data = await callApi.post(`/auth/password_reset?token=${token}`, {
			password,
		});

		if (data.success) {
			setSuccess(true);
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}
	};

	const _handleKeyPress = (e: React.KeyboardEvent): void => {
		if (e.key === 'Enter') {
			_handleSubmit();
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<section className='password-reset-verify'>
			{verified ? (
				success ? (
					<Typography variant='h2'>Success ! You can now log in</Typography>
				) : (
					<div className='form'>
						<Typography variant='h5' style={{marginBottom: 20}}>
							Change password
						</Typography>

						<TextField
							type='password'
							label='Password'
							className='input'
							value={password}
							variant='outlined'
							onChange={_handleChangePassword}
							onKeyPress={_handleKeyPress}
						/>

						<TextField
							type='password'
							label='Repeat password'
							className='input'
							value={repeatPassword}
							variant='outlined'
							onChange={_handleChangeRepeatPassword}
							onKeyPress={_handleKeyPress}
						/>

						<Button variant='contained' color='primary' onClick={_handleSubmit} fullWidth>
							Submit
						</Button>
					</div>
				)
			) : (
				<Typography variant='h2'>Something went wrong. Try reloading the page</Typography>
			)}
		</section>
	);
};

export default PasswordResetVerify;
