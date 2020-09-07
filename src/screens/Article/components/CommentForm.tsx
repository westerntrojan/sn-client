import React, {useState, useCallback, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import {UserAvatar, NotAuthAvatar} from '@components/common/avatars';
import useRedirect from '@utils/hooks/useRedirect';
import Context from '@screens/Article/context';

const useStyles = makeStyles({
	root: {
		display: 'flex',
	},
	form: {
		flex: 1,
	},
	avatar: {
		marginRight: 10,
	},
	input: {
		marginBottom: 10,
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

type Props = {
	submit: (comment: {text: string; parentId?: string}) => any;
};

const CommentForm: React.FC<Props> = ({submit}) => {
	const classes = useStyles();

	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);
	const [showButtons, setShowButtons] = useState(false);

	const {auth} = useContext(Context);

	const redirectTo = useRedirect();

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

		const data = await submit({text});

		if (data.success) {
			setText('');
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
	};

	const _handleKeyPressTextarea = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleFocus = (): void => {
		if (!auth.isAuth) {
			return redirectTo('/auth');
		}

		setShowButtons(true);
	};

	return (
		<div className={classNames('comment-form', classes.root)}>
			{auth.isAuth ? (
				<UserAvatar user={auth.user} className={classes.avatar} />
			) : (
				<NotAuthAvatar className={classes.avatar} />
			)}
			<div className={classNames('form', classes.form)}>
				<TextField
					placeholder='Add a public comment...'
					className={classes.input}
					multiline
					rowsMax='14'
					value={text}
					onChange={_handleChangeText}
					onKeyPress={_handleKeyPressTextarea}
					disabled={loading}
					error={text.length > 3000}
					onFocus={_handleFocus}
				/>

				{showButtons && (
					<div className={classes.buttons}>
						<Button style={{marginRight: 10}} onClick={_handleCancel}>
							Cancel
						</Button>

						<Button
							color='primary'
							variant='contained'
							disabled={disabledButton || loading}
							onClick={_handleSubmit}
						>
							Submit
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentForm;
