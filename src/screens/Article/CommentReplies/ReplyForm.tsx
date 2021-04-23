import React, {useState, useCallback, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import {UserAvatar} from '@/components/common/avatars';
import {IComment} from '@/store/types';
import Context from '@/screens/Article/context';

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
	cancelButton: {
		marginRight: 10,
	},
});

type Props = {
	parentId: string;
	comment: IComment;
	handleClose: () => void;
};

const ReplyForm: React.FC<Props> = ({parentId, comment, handleClose}) => {
	const classes = useStyles();

	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const {auth, handleSubmitReply} = useContext(Context);

	const userName = `${comment.user.firstName} ${comment.user.lastName}`.trim();
	const defaultText = `${userName}, `;

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

	useEffect(() => {
		setText(defaultText);
	}, [defaultText]);

	const _handleCancel = () => {
		setText('');
		handleClose();
	};

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const data = await handleSubmitReply({parentId: parentId, text});

		if (data.success) {
			setText('');
			handleClose();
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
	};

	const _handleKeyPressTextarea = (target: React.KeyboardEvent) => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<div className={classNames('reply-form', classes.root)}>
			<UserAvatar user={auth.user} className={classes.avatar} small />

			<div className={classNames('form', classes.form)}>
				<TextField
					placeholder='Add a public reply...'
					className={classes.input}
					multiline
					rowsMax='14'
					value={text}
					onChange={_handleChangeText}
					onKeyPress={_handleKeyPressTextarea}
					disabled={loading}
					error={text.length > 3000}
					size='small'
					autoFocus
				/>

				<div className={classes.buttons}>
					<Button className={classes.cancelButton} onClick={_handleCancel}>
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
			</div>
		</div>
	);
};

export default ReplyForm;
