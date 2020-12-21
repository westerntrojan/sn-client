import React, {useState, useCallback, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';

import {IUser} from '@store/types';

const useStyles = makeStyles(theme => ({
	root: {
		flex: 1,
	},
	fields: {
		display: 'flex',
		alignItems: 'center',

		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			marginBottom: 0,
		},
	},
	firstInput: {
		width: '100%',
		marginRight: 20,
		[theme.breakpoints.down('xs')]: {
			marginRight: 0,
		},
	},
	input: {
		width: '100%',
		marginBottom: '20px',
	},
}));

type Props = {
	user: IUser;
	handleSubmit: (user: IUser) => Promise<any>;
};

const Form: React.FC<Props> = ({user, handleSubmit}) => {
	const classes = useStyles();

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [bio, setBio] = useState('');
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (
			firstName.trim() &&
			email.trim() &&
			(firstName !== user.firstName ||
				lastName !== user.lastName ||
				username !== user.username ||
				email !== user.email ||
				bio !== user.bio)
		) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [firstName, lastName, username, email, bio, user]);

	useEffect(() => {
		setBio(user.bio);
	}, [user]);

	useEffect(() => {
		validate();
	}, [validate]);

	const _handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
	};

	const _handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};

	const _handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const _handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const _handleChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBio(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const data = await handleSubmit({
			...user,
			firstName,
			lastName,
			username,
			email,
			bio,
		});

		if (data.success) {
			enqueueSnackbar('User changed', {variant: 'success'});
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleKeyPressTextarea = (target: React.KeyboardEvent) => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<div className={classNames('form', classes.root)}>
			<div className='form'>
				<div className={classes.fields}>
					<TextField
						label='First name'
						variant='outlined'
						className={classNames(classes.input, classes.firstInput)}
						value={firstName}
						onChange={_handleChangeFirstName}
						onKeyPress={_handleKeyPressInput}
						disabled={loading}
						error={firstName.length > 20}
					/>
					<TextField
						label='Last name'
						variant='outlined'
						className={classes.input}
						value={lastName}
						onChange={_handleChangeLastName}
						onKeyPress={_handleKeyPressInput}
						disabled={loading}
						error={lastName.length > 20}
					/>
				</div>
				<TextField
					label='Username'
					variant='outlined'
					className={classes.input}
					value={username}
					onChange={_handleChangeUsername}
					onKeyPress={_handleKeyPressInput}
					disabled={loading}
					error={username.length > 40}
				/>

				<TextField
					type='email'
					label='Email'
					variant='outlined'
					className={classes.input}
					value={email}
					onChange={_handleChangeEmail}
					onKeyPress={_handleKeyPressInput}
					disabled={loading}
				/>

				<TextField
					label='Bio'
					value={bio}
					variant='outlined'
					className={classes.input}
					multiline
					rows='2'
					rowsMax='8'
					onChange={_handleChangeBio}
					onKeyPress={_handleKeyPressTextarea}
					disabled={loading}
					error={bio.length > 1000}
				/>

				<Button
					color='primary'
					variant='contained'
					disabled={disabledButton || loading}
					onClick={_handleSubmit}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default Form;
