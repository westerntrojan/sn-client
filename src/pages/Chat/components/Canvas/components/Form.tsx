import React, {useState, useRef, useEffect, useCallback} from 'react';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import {useRedirect} from '@utils/hooks';

const useStyles = makeStyles({
	root: {
		padding: '10px 0',
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	input: {
		flex: 1,
	},
	attachButton: {
		padding: 10,
		position: 'absolute',
		left: 5,
	},
	attachIcon: {
		transform: 'rotate(-135deg)',
	},
	smileButton: {
		padding: 10,
		position: 'absolute',
	},
	rightButton: {
		padding: 10,
		position: 'absolute',
		right: 5,
	},
});

type Props = {
	auth: {
		isAuth: boolean;
	};
	handleSubmit: (object: any) => void;
	handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form: React.FC<Props> = ({auth, handleSubmit, handleChangeImage}) => {
	const classes = useStyles();

	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');
	const [icon, setIcon] = useState(0);

	const buttonRef = useRef<HTMLLabelElement>(null);
	const [buttonWidth, setButtonWidth] = useState(0);

	const redirectTo = useRedirect();

	const validate = useCallback(() => {
		if (text.trim()) {
			setIcon(1);
		} else {
			setIcon(0);
		}
	}, [text]);

	useEffect(() => {
		if (buttonRef.current) {
			setButtonWidth(buttonRef.current.offsetWidth);
		}
	}, []);

	useEffect(() => {
		validate();
	}, [validate]);

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	const _handleSubmit = (): void => {
		setLoading(true);

		if (text.trim()) {
			handleSubmit({type: 'text', text});
		}

		setText('');
		setLoading(false);
		setIcon(0);
	};

	const _handlePressKeyInput = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleFocus = (): void => {
		if (!auth.isAuth) {
			return redirectTo('/auth');
		}
	};

	const _handleIconClick = (): void => {
		if (!auth.isAuth) {
			return redirectTo('/auth');
		}
	};

	return (
		<Paper
			className={classes.root}
			style={{paddingLeft: buttonWidth + 10, paddingRight: buttonWidth * 2 + 10}}
		>
			<IconButton
				onClick={_handleIconClick}
				className={classes.attachButton}
				ref={buttonRef}
				component='label'
			>
				<AttachFileIcon className={classes.attachIcon} />

				{auth.isAuth && (
					<input type='file' style={{display: 'none'}} onChange={handleChangeImage} />
				)}
			</IconButton>

			<InputBase
				className={classes.input}
				multiline
				rowsMax='10'
				placeholder='Write a message...'
				value={text}
				onChange={_handleChangeText}
				disabled={loading}
				onKeyPress={_handlePressKeyInput}
				onFocus={_handleFocus}
				autoFocus={auth.isAuth}
			/>

			<IconButton
				onClick={_handleIconClick}
				className={classes.smileButton}
				style={{right: buttonWidth + 5}}
			>
				<InsertEmoticonIcon />
			</IconButton>

			<Zoom in={Boolean(icon)}>
				<IconButton color='primary' className={classes.rightButton} onClick={_handleSubmit}>
					<SendIcon />
				</IconButton>
			</Zoom>

			<Zoom in={!Boolean(icon)}>
				<IconButton onClick={_handleIconClick} className={classes.rightButton}>
					<MicNoneIcon />
				</IconButton>
			</Zoom>
		</Paper>
	);
};

export default Form;
