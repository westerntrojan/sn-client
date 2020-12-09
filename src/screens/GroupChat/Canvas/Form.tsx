import React, {useState, useRef, useEffect, useContext} from 'react';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useSelector, shallowEqual} from 'react-redux';

import {useAuthModal} from '@utils/hooks';
import GroupChatContext from '@screens/GroupChat/GroupChatContext';
import {RootState} from '@store/types';

const useStyles = makeStyles({
	editedMessage: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		padding: 4,
		display: 'flex',
		alignItems: 'center',
	},
	keyboard: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
		padding: 4,
		boxShadow: 'none',
	},
	input: {
		flex: 1,
		margin: '0 6px',
	},
	attachIcon: {
		transform: 'rotate(-135deg)',
	},
	rightButton: {
		position: 'absolute',
		right: 4,
	},
});

const Form: React.FC = () => {
	const classes = useStyles();

	const {handleSubmitMessage} = useContext(GroupChatContext);

	const [text, setText] = useState('');

	const [buttonWidth, setButtonWidth] = useState(0);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {openAuthModal} = useAuthModal();

	useEffect(() => {
		if (buttonRef.current) {
			setButtonWidth(buttonRef.current.offsetWidth);
		}
	}, []);

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const _handleSubmit = () => {
		if (!text.trim()) return;

		handleSubmitMessage(text);

		setText('');
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleMouseDown = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}
	};
	const _handleIconClick = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}
	};

	return (
		<Paper className={classes.keyboard}>
			<IconButton onClick={_handleIconClick} ref={buttonRef}>
				<AttachFileIcon className={classes.attachIcon} />
			</IconButton>

			<InputBase
				className={classes.input}
				multiline
				rowsMax='10'
				placeholder='Write a message...'
				value={text}
				onChange={_handleChangeText}
				onKeyPress={_handleKeyPressInput}
				onMouseDown={_handleMouseDown}
				autoFocus={auth.isAuth}
				inputRef={inputRef}
			/>

			<IconButton onClick={_handleIconClick} style={{marginRight: buttonWidth}}>
				<InsertEmoticonIcon />
			</IconButton>

			<Zoom in={Boolean(text.trim())}>
				<IconButton color='primary' className={classes.rightButton}>
					<SendIcon />
				</IconButton>
			</Zoom>

			<Zoom in={!Boolean(text.trim())}>
				<IconButton className={classes.rightButton}>
					<MicNoneIcon />
				</IconButton>
			</Zoom>
		</Paper>
	);
};

export default Form;
