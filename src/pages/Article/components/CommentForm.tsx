import React, {useState, useCallback, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import {useHistory} from 'react-router';

import {ContainedButton} from '@components/SubmitButtons';
import {userAvatar} from '@utils/users';
import {IUser} from '@store/types';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
	},
	avatar: {
		marginRight: 10,
	},
	form: {
		flex: 1,
	},
	input: {
		marginBottom: '20px',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	cancelButton: {
		marginRight: 10,
	},
}));

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
		user: IUser;
	};
	handleSubmit: (text: string) => void;
};

const CommentForm: React.FC<Props> = ({auth, handleSubmit}) => {
	const classes = useStyles();

	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);
	const [showButtons, setShowButtons] = useState(false);

	const history = useHistory();

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (text.trim()) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [text]);

	useEffect(() => {
		validate();
	}, [validate]);

	const _handleCancel = (): void => {
		setText('');
		setShowButtons(false);
	};

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const error: any = await handleSubmit(text);

		if (error) {
			setLoading(false);
			enqueueSnackbar(error.msg, {variant: 'error'});

			return;
		}

		setLoading(false);
		setText('');
		enqueueSnackbar('Comment added', {variant: 'success'});
	};

	const _handlePressKeyTextarea = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleFocus = (): void => {
		if (!auth.isAuth) {
			return history.push('/auth');
		}

		setShowButtons(true);
	};

	return (
		<div className={classNames('comment-form', classes.root)}>
			{auth.isAuth ? (
				<Avatar
					className={classNames('avatar', classes.avatar)}
					src={auth.user.avatar.images[0]}
					style={{backgroundColor: auth.user.avatar.color}}
				>
					{userAvatar(auth.user)}
				</Avatar>
			) : (
				<Avatar className={classNames('avatar', classes.avatar)}>
					<PersonIcon />
				</Avatar>
			)}
			<div className={classNames('form', classes.form)}>
				<TextField
					placeholder='Add a public comment...'
					className={classes.input}
					multiline
					rowsMax='14'
					value={text}
					onChange={_handleChangeText}
					onKeyPress={_handlePressKeyTextarea}
					disabled={loading}
					error={text.length > 3000}
					onFocus={_handleFocus}
				/>

				{showButtons && (
					<div className={classes.buttons}>
						<Button className={classes.cancelButton} onClick={_handleCancel}>
							Cancel
						</Button>

						<ContainedButton loading={loading} disabled={disabledButton} onClick={_handleSubmit}>
							Submit
						</ContainedButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentForm;
