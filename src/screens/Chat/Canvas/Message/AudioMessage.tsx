import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Audio} from 'cloudinary-react';

import {IMessage} from '@components/common/chats/types';

const useStyles = makeStyles({
	root: {
		lineHeight: 0,
		width: '30%',
	},
});

type Props = {
	message: IMessage;
};

const AudioMessage: React.FC<Props> = ({message}) => {
	const classes = useStyles();

	return (
		<Audio
			cloudName={process.env.REACT_APP_CLOUD_NAME}
			publicId={message.audio}
			className={classes.root}
			disabled
			controls
		>
			Cannot play
			<b>audio</b>.
		</Audio>
	);
};

export default AudioMessage;
