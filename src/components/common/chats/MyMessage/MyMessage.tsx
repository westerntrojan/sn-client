import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {useStyles} from './MyMessageStyle';
import {IMessage} from '@components/common/chats/types';
import TextMessage from './TextMessage';
import AudioMessage from './AudioMessage';
import MessageMenu from './MessageMenu';

type Props = {
	message: IMessage;
	alterHeader: boolean;
	selectMessage: (messageId: string) => void;
	editMessage?: (messageId: string) => void;
};

const MyMessage: React.FC<Props> = ({message, alterHeader, selectMessage, editMessage}) => {
	const classes = useStyles();

	const [isSelect, setIsSelect] = useState(false);
	const [checkIcon, setCheckIcon] = useState(false);
	const [messageMenu, setMessageMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{top: number; left: number}>({top: 0, left: 0});

	useEffect(() => {
		if (!alterHeader) {
			setIsSelect(false);
		}
	}, [alterHeader]);

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
		selectMessage(message._id);
	};

	const handleEdit = (): void => {
		if (editMessage) {
			editMessage(message._id);
		}
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

			<MessageMenu
				open={messageMenu}
				position={menuPosition}
				handleSelect={handleSelect}
				handleEdit={handleEdit}
				closeMenu={(): void => setMessageMenu(false)}
			/>
		</Paper>
	);
};

export default MyMessage;
