import React, {useState, useRef, useEffect, useCallback, useContext} from 'react';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import Context, {IContext} from '@pages/UsersChat/context';

const useStyles = makeStyles({
	root: {
		padding: '10px 0',
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
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

const Form: React.FC = () => {
	const classes = useStyles();

	const {handleSubmitMessage, handleTyping, handleTypingEnd}: IContext = useContext(Context);

	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');
	const [icon, setIcon] = useState(0);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [buttonWidth, setButtonWidth] = useState(0);

	const validate = useCallback(() => {
		if (text.trim()) {
			setIcon(1);
			handleTyping();
		} else {
			setIcon(0);
		}
	}, [handleTyping, text]);

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
			handleSubmitMessage(text);
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

	return (
		<Paper
			className={classes.root}
			style={{paddingLeft: buttonWidth + 10, paddingRight: buttonWidth * 2 + 10}}
		>
			<IconButton className={classes.attachButton} ref={buttonRef}>
				<AttachFileIcon className={classes.attachIcon} />
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
				onBlur={handleTypingEnd}
				autoFocus
			/>

			<IconButton className={classes.smileButton} style={{right: buttonWidth + 5}}>
				<InsertEmoticonIcon />
			</IconButton>

			<Zoom in={Boolean(icon)}>
				<IconButton color='primary' className={classes.rightButton} onClick={_handleSubmit}>
					<SendIcon />
				</IconButton>
			</Zoom>

			<Zoom in={!Boolean(icon)}>
				<IconButton className={classes.rightButton}>
					<MicNoneIcon />
				</IconButton>
			</Zoom>
		</Paper>
	);
};

export default Form;
