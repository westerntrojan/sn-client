import React, {useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import {useForm, useController} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {UserAvatar, NotAuthAvatar} from '@/components/common/avatars';
import {useAuthModal} from '@/utils/hooks';
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
});

const formSchema = yup.object().shape({
	text: yup
		.string()
		.max(3000, 'Max length 3000')
		.required('This is required field'),
});

type FormData = {
	text: string;
};

type Props = {
	onSubmit: (text: string) => Promise<{success: boolean; message?: string}>;
};

const CommentForm: React.FC<Props> = ({onSubmit}) => {
	const classes = useStyles();

	const [loading, setLoading] = useState(false);
	const [showButtons, setShowButtons] = useState(false);

	const {auth} = useContext(Context);

	const {handleSubmit, reset, control} = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			text: '',
		},
		mode: 'onChange',
	});

	const textField = useController({
		control,
		name: 'text',
	});

	const {openAuthModal} = useAuthModal();

	const {enqueueSnackbar} = useSnackbar();

	const _handleCancel = () => {
		reset();
		setShowButtons(false);
	};

	const _handleSubmit = handleSubmit(
		async ({text}: FormData): Promise<void> => {
			setLoading(true);

			const data = await onSubmit(text);

			if (data.success) {
				_handleCancel();
			} else {
				enqueueSnackbar(data.message, {variant: 'error'});
			}

			setLoading(false);
		},
	);

	const _handleKeyPressTextarea = (target: React.KeyboardEvent) => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleMouseDown = () => {
		if (!auth.isAuth) {
			return openAuthModal();
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
					onKeyPress={_handleKeyPressTextarea}
					disabled={loading}
					onMouseDown={_handleMouseDown}
					helperText={textField.fieldState.error?.message}
					error={!!textField.fieldState.error}
					{...textField.field}
				/>

				{showButtons && (
					<div className={classes.buttons}>
						<Button style={{marginRight: 10}} onClick={_handleCancel}>
							Cancel
						</Button>

						<Button
							color='primary'
							variant='contained'
							onClick={_handleSubmit}
							disabled={!textField.field.value || !!textField.fieldState.error || loading}
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
