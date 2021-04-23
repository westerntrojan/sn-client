import React, {useState, useEffect, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useSnackbar} from 'notistack';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {IRegisterInputs} from '@/components/layouts/modals/AuthModal/types';

const useStyles = makeStyles(theme => ({
	fields: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,

		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			marginBottom: 0,
		},
	},
	passwordFiled: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			marginBottom: 20,
		},
	},
	input: {
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			marginBottom: 20,
		},
	},
	firstInput: {
		width: '100%',
		marginRight: 20,
		[theme.breakpoints.down('xs')]: {
			marginRight: 0,
		},
	},
	hide: {
		visibility: 'hidden',
	},
}));

type Props = {
	submit: (data: IRegisterInputs) => void;
};

const Register: React.FC<Props> = ({submit}) => {
	const classes = useStyles();
	const matches = useMediaQuery('(min-width:600px)');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (firstName.trim() && email.trim() && password.trim() && password === confirmPassword) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [firstName, email, password, confirmPassword]);

	useEffect(() => {
		validate();
	}, [validate]);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();

	const _handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
	};

	const _handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};

	const _handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const _handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const _handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const data: any = await submit({
			firstName,
			lastName,
			email,
			password,
		});

		setLoading(false);

		if (data.success) {
			setSuccess(true);
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<div className='register'>
			{success && (
				<Typography variant='h5' style={{textAlign: 'center'}}>
					Verify your email
				</Typography>
			)}

			{!success && (
				<div className='form'>
					<div className={classes.fields}>
						<TextField
							label='First name'
							variant='outlined'
							value={firstName}
							className={classNames(classes.input, classes.firstInput)}
							onChange={_handleChangeFirstName}
							onKeyPress={_handleKeyPressInput}
							error={firstName.length > 20}
							disabled={loading}
							autoFocus
						/>
						<TextField
							label='Last name'
							variant='outlined'
							value={lastName}
							className={classes.input}
							onChange={_handleChangeLastName}
							onKeyPress={_handleKeyPressInput}
							error={lastName.length > 20}
							disabled={loading}
						/>
					</div>

					<div className={classes.fields}>
						<TextField
							type='email'
							label='Email'
							variant='outlined'
							value={email}
							className={classes.input}
							onChange={_handleChangeEmail}
							onKeyPress={_handleKeyPressInput}
							disabled={loading}
						/>
					</div>

					<div className={classes.fields}>
						<div className={classes.passwordFiled}>
							<TextField
								type={showPassword ? 'text' : 'password'}
								value={password}
								label='Password'
								variant='outlined'
								onChange={_handleChangePassword}
								onKeyPress={_handleKeyPressInput}
								className={classes.firstInput}
								disabled={loading}
							/>

							{!matches && (
								<IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							)}
						</div>

						<div className={classes.passwordFiled}>
							<TextField
								type={showPassword ? 'text' : 'password'}
								value={confirmPassword}
								label='Confirm'
								variant='outlined'
								onChange={_handleChangeConfirmPassword}
								onKeyPress={_handleKeyPressInput}
								className={matches ? classes.input : classes.firstInput}
								disabled={loading}
							/>

							{!matches && (
								<IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									className={classes.hide}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							)}
						</div>

						{matches && (
							<IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						)}
					</div>

					<Button
						color='primary'
						variant='contained'
						onClick={_handleSubmit}
						disabled={disabledButton || loading}
					>
						Register
					</Button>
				</div>
			)}
		</div>
	);
};

export default Register;
