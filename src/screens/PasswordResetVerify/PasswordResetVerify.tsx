import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Typography from '@material-ui/core/Typography';
import {useSnackbar} from 'notistack';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './PasswordResetVerify.scss';
import callApi from '@utils/callApi';
import Loader from '@components/common/loaders/Loader';

const PasswordResetVerify: React.FC = () => {
	const {token} = useParams<{token: string}>();

	const [verified, setVerified] = useState(false);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [loadingData, setLoadingData] = useState(true);
	const [loading, setLoading] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		const validateToken = async (): Promise<void> => {
			const data = await callApi.get(`/auth/password_reset/verify?token=${token}`);

			if (data.success) {
				setVerified(true);
			}

			setLoadingData(false);
		};
		validateToken();
	}, [token]);

	const _handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const _handleChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRepeatPassword(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (!password.trim() || !repeatPassword.trim() || password !== repeatPassword) {
			return;
		}

		setLoading(true);

		const data = await callApi.post(`/auth/password_reset?token=${token}`, {
			password,
		});

		if (data.success) {
			setSuccess(true);
		} else {
			setLoading(false);
			enqueueSnackbar(data.message, {variant: 'error'});
		}
	};

	const _handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			_handleSubmit();
		}
	};

	if (loadingData) {
		return <Loader />;
	}

	return (
		<section className='password-reset-verify'>
			{verified ? (
				success ? (
					<Typography variant='h2'>Success! You can now log in</Typography>
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
							disabled={loading}
						/>

						<TextField
							type='password'
							label='Repeat password'
							className='input'
							value={repeatPassword}
							variant='outlined'
							onChange={_handleChangeRepeatPassword}
							onKeyPress={_handleKeyPress}
							disabled={loading}
						/>

						<Button
							variant='contained'
							color='primary'
							disabled={loading}
							onClick={_handleSubmit}
							fullWidth
						>
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
