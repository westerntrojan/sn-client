import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {useStyles} from './MyMessageStyle';
import {IMessage} from '@components/common/chats/types';
import TextMessage from './TextMessage';
import AudioMessage from './AudioMessage';

type Props = {
	message: IMessage;
	alterHeader: boolean;
	selectMessage: (_id: string) => void;
};

const MyMessage: React.FC<Props> = ({message, alterHeader, selectMessage}) => {
	const classes = useStyles();

	const [isSelect, setIsSelect] = useState(false);
	const [checkIcon, setCheckIcon] = useState(false);

	useEffect(() => {
		if (!alterHeader) {
			setIsSelect(false);
		}
	}, [alterHeader]);

	const _handleClickMessage = (): void => {
		setIsSelect(!isSelect);
		selectMessage(message._id);
	};

	return (
		<Paper
			className={classNames('my-message', classes.root, {
				[classes.selectedRoot]: isSelect,
			})}
			onClick={_handleClickMessage}
			onMouseEnter={(): void => setCheckIcon(true)}
			onMouseLeave={(): void => setCheckIcon(false)}
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
		</Paper>
	);
};

export default MyMessage;
