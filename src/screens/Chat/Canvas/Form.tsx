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
import Divider from '@material-ui/core/Divider';

import {useAuthModal} from '@utils/hooks';
import Context from '@screens/Chat/context';

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
};

const Form: React.FC<Props> = ({auth}) => {
	const classes = useStyles();

	const {handleSubmitMessage} = useContext(Context);

	const [text, setText] = useState('');
	const [icon, setIcon] = useState(0);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [buttonWidth, setButtonWidth] = useState(0);

	const {openAuthModal} = useAuthModal();

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
		if (!text.trim()) {
			return;
		}

		handleSubmitMessage(text);

		setText('');
	};

	const _handleKeyDown = (target: React.KeyboardEvent): void => {
		// if (target.ctrlKey && target.keyCode === 13) {
		// 	setText(text + '\n');
		// }
	};
	const _handleKeyPressInput = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}

		// if (!target.ctrlKey && target.charCode === 13) {
		// 	target.preventDefault();
		// 	_handleSubmit();
		// }
	};

	const _handleMouseDown = (): void => {
		if (!auth.isAuth) {
			return openAuthModal();
		}
	};

	const _handleIconClick = (): void => {
		if (!auth.isAuth) {
			return openAuthModal();
		}
	};

	return (
		<>
			<Divider />

			<Paper
				className={classes.root}
				style={{paddingLeft: buttonWidth + 10, paddingRight: buttonWidth * 2 + 10}}
			>
				<IconButton onClick={_handleIconClick} className={classes.attachButton} ref={buttonRef}>
					<AttachFileIcon className={classes.attachIcon} />
				</IconButton>

				<InputBase
					className={classes.input}
					multiline
					rowsMax='10'
					placeholder='Write a message...'
					value={text}
					onChange={_handleChangeText}
					onKeyDown={_handleKeyDown}
					onKeyPress={_handleKeyPressInput}
					onMouseDown={_handleMouseDown}
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
		</>
	);
};

export default Form;
