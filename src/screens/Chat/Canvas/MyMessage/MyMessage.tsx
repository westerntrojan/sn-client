import React, {useState, useEffect, useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {useStyles} from './MyMessageStyle';
import {IMessage} from '@components/common/chats/types';
import TextMessage from './TextMessage';
import AudioMessage from './AudioMessage';
import {MessageMenu, SelectedMessageMenu, WithSelectedMessageMenu} from './message-menu';
import ChatContext from '@screens/Chat/ChatContext';
import CanvasContext from '@screens/Chat/Canvas/CanvasContext';
import * as types from '@screens/Chat/Canvas/reducer/types';
import {RemoveModal} from '@components/common/modals';

type Props = {
	message: IMessage;
};

const MyMessage: React.FC<Props> = ({message}) => {
	const classes = useStyles();

	const {handleRemoveMessages} = useContext(ChatContext);
	const {
		state: {selectedMessages},
		dispatch,
	} = useContext(CanvasContext);

	const [isSelect, setIsSelect] = useState(false);
	const [checkIcon, setCheckIcon] = useState(false);
	const [messageMenu, setMessageMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{top: number; left: number}>({top: 0, left: 0});
	const [removeMessageModal, setRemoveMessageModal] = useState(false);

	useEffect(() => {
		if (!Boolean(selectedMessages.length)) {
			setIsSelect(false);
		}
	}, [selectedMessages]);

	const _handleContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault();

		setCheckIcon(false);

		if (messageMenu) {
			setMessageMenu(false);
		} else {
			setMenuPosition({top: e.clientY, left: e.clientX});
			setMessageMenu(true);
		}
	};

	const handleSelect = (): void => {
		const selection = window.getSelection()?.toString();
		if (selection) return;

		setIsSelect(!isSelect);
		dispatch({
			type: types.SELECT_MESSAGE,
			payload: {
				messageId: message._id,
			},
		});
	};

	const handleEdit = (): void => {
		dispatch({
			type: types.SET_EDITED_MESSAGE,
			payload: {
				message,
			},
		});
	};

	const handleRemove = (): void => {
		handleRemoveMessages([message._id]);
	};

	const handleClearSelected = (): void => {
		dispatch({type: types.CLEAR_SELECTED_MESSAGES});
	};

	const handleRemoveSelected = (): void => {
		dispatch({type: types.OPEN_REMOVE_MESSAGES_MODAL});
	};

	return (
		<Paper
			className={classNames('my-message', classes.root, {
				[classes.selectedRoot]: isSelect,
			})}
			onClick={handleSelect}
			onContextMenu={_handleContextMenu}
			onMouseEnter={() => setCheckIcon(true)}
			onMouseLeave={() => setCheckIcon(false)}
		>
			<CheckCircleIcon
				color='primary'
				className={classNames(classes.checkIcon, {
					[classes.hoverCheckIcon]: checkIcon,
					[classes.activeCheckIcon]: isSelect,
				})}
			/>

			{message.type === 'text' && <TextMessage message={message} />}

			{message.type === 'audio' && <AudioMessage message={message} />}

			{isSelect && (
				<SelectedMessageMenu
					open={messageMenu}
					position={menuPosition}
					handleClearSelected={handleClearSelected}
					handleRemoveSelected={handleRemoveSelected}
					closeMenu={(): void => setMessageMenu(false)}
				/>
			)}

			{!isSelect && Boolean(selectedMessages.length) && (
				<WithSelectedMessageMenu
					open={messageMenu}
					position={menuPosition}
					handleSelect={handleSelect}
					closeMenu={(): void => setMessageMenu(false)}
				/>
			)}

			{!isSelect && !Boolean(selectedMessages.length) && (
				<MessageMenu
					open={messageMenu}
					position={menuPosition}
					handleSelect={handleSelect}
					handleEdit={handleEdit}
					handleRemove={() => setRemoveMessageModal(true)}
					closeMenu={(): void => setMessageMenu(false)}
				/>
			)}

			<RemoveModal
				open={removeMessageModal}
				text='Do you want to remove this message?'
				action={handleRemove}
				closeModal={() => setRemoveMessageModal(false)}
			/>
		</Paper>
	);
};

export default MyMessage;
