import React, {useState, useEffect, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {useSnackbar} from 'notistack';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ConfirmEmailModal from './ConfirmEmailModal';
import CodeModal from './CodeModal';
import {ILoginInputs} from '@/components/layouts/modals/AuthModal/types';

const useStyles = makeStyles(() => ({
	input: {
		marginBottom: 20,
	},
	actions: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginBottom: 20,
	},
}));

type Props = {
	submit: (data: ILoginInputs) => any;
};

const Login: React.FC<Props> = ({submit}) => {
	const classes = useStyles();

	const [userLink, setUserLink] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);
	const [loading, setLoading] = useState(false);
	const [twoFactorAuth, setTwoFactorAuth] = useState(false);
	const [confirmEmailModal, setConfirmEmailModal] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (userLink.trim() && password.trim()) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [userLink, password]);

	useEffect(() => {
		validate();
	}, [validate]);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();

	const _handleChangeUserLink = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserLink(e.target.value);
	};

	const _handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const _handleChangeRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRememberMe(e.target.checked);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const data = await submit({userLink, password, rememberMe});

		if (!data.success) {
			setLoading(false);

			if (data.twoFactorAuth) {
				setTwoFactorAuth(true);
			} else {
				enqueueSnackbar(data.message, {variant: 'error'});
			}
		}
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<div className='login'>
			<div className='form'>
				<TextField
					label='Email or username'
					variant='outlined'
					value={userLink}
					className={classes.input}
					onChange={_handleChangeUserLink}
					onKeyPress={_handleKeyPressInput}
					disabled={loading}
					autoFocus
				/>

				<TextField
					label='Password'
					variant='outlined'
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={_handleChangePassword}
					onKeyPress={_handleKeyPressInput}
					className={classes.input}
					disabled={loading}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<div className={classes.actions}>
					<Link
						color='primary'
						onClick={() => setConfirmEmailModal(true)}
						style={{cursor: 'pointer', marginBottom: 5}}
						underline='none'
					>
						Forgot password ?
					</Link>

					<FormControlLabel
						control={
							<Checkbox
								checked={rememberMe}
								onChange={_handleChangeRememberMe}
								name=''
								color='primary'
							/>
						}
						label='Remember me'
					/>
				</div>

				<Button
					color='primary'
					variant='contained'
					onClick={_handleSubmit}
					disabled={disabledButton || loading}
				>
					Login
				</Button>
			</div>

			<CodeModal
				open={twoFactorAuth}
				closeModal={() => setTwoFactorAuth(false)}
				rememberMe={rememberMe}
			/>
			<ConfirmEmailModal open={confirmEmailModal} closeModal={() => setConfirmEmailModal(false)} />
		</div>
	);
};

export default Login;
