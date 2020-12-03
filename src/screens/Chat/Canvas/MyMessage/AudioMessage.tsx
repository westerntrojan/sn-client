import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Audio} from 'cloudinary-react';
import LinearProgress from '@material-ui/core/LinearProgress';

import {IMessage} from '@components/common/chats/types';

const useStyles = makeStyles({
	root: {
		position: 'relative',
		width: '30%',
		lineHeight: 0,
	},
	audio: {
		width: '100%',
	},
	loader: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, .8)',
	},
});

type Props = {
	message: IMessage;
};

const AudioMessage: React.FC<Props> = ({message}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Audio
				cloudName={process.env.REACT_APP_CLOUD_NAME}
				publicId={message.audio}
				className={classes.audio}
				disabled
				controls
			>
				Cannot play
				<b>audio</b>.
			</Audio>

			{false && (
				<div className={classes.loader}>
					<LinearProgress />
				</div>
			)}
		</div>
	);
};

export default AudioMessage;
