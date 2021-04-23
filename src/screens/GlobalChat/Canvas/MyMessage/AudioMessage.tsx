import React, {useEffect, useState, useRef, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import classNames from 'classnames';
import moment from 'moment';

import {IMessage} from '@/components/common/chats/types';
import {formatTime} from './time';
import GlobalChatContext from '@/screens/GlobalChat/GlobalChatContext';

const useStyles = makeStyles(theme => ({
	root: {
		padding: 10,
		width: 300,
		display: 'flex',
		alignItems: 'center',
		position: 'relative',

		'& .MuiSlider-thumb': {
			'&::after': {
				display: 'none',
			},

			'&:hover, &:active, &:focus': {
				boxShadow: 'none',
			},
		},
	},
	leftBlock: {
		marginRight: 10,
	},
	playButton: {
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',

		'&:hover': {
			backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
		},
	},
	icon: {
		color: theme.palette.type === 'light' ? 'white' : theme.palette.primary.main,
	},
	rightBlock: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	slider: {
		color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
	},
	loadingButton: {
		position: 'relative',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',

		'&:hover': {
			backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
		},
	},
	loader: {
		position: 'absolute',
		color: theme.palette.type === 'light' ? 'white' : theme.palette.primary.main,
	},
	info: {
		position: 'absolute',
		right: 10,
		bottom: 5,
		display: 'flex',
		alignItems: 'center',
		opacity: 0.8,
	},
	created: {
		marginRight: 10,
	},
}));

type Props = {
	isSelect: boolean;
	message: IMessage;
};

const AudioMessage: React.FC<Props> = ({isSelect, message}) => {
	const classes = useStyles();

	const {handleCancelLoadingMessage} = useContext(GlobalChatContext);

	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [currentTime, setCurrentTime] = useState('00:00');
	const [duration, setDuration] = useState('00:00');

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleCanplay = () => {
		if (audioRef.current) {
			if (audioRef.current.duration === Infinity) {
				audioRef.current.load();

				return;
			}

			const hasHours = audioRef.current.duration / 3600 >= 1.0;

			setDuration(formatTime(audioRef.current.duration, hasHours));

			audioRef.current.volume = 0.4;
		}
	};
	const handleTimeupdate = () => {
		if (audioRef.current) {
			const hasHours = audioRef.current.duration / 3600 >= 1.0;

			setCurrentTime(formatTime(audioRef.current.currentTime, hasHours));
			setDuration(formatTime(audioRef.current.duration, hasHours));

			const value = Math.floor((100 / audioRef.current.duration) * audioRef.current.currentTime);

			setProgress(value);
		}
	};
	const handleEnded = () => {
		if (audioRef.current) {
			audioRef.current.pause();

			setPlaying(false);
			setProgress(0);
			audioRef.current.currentTime = 0;
		}
	};

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('canplay', handleCanplay);
			audioRef.current.addEventListener('timeupdate', handleTimeupdate);
			audioRef.current.addEventListener('ended', handleEnded);
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.removeEventListener('canplay', handleCanplay);
				audioRef.current.removeEventListener('timeupdate', handleTimeupdate);
				audioRef.current.removeEventListener('ended', handleEnded);
			}
		};
	}, []);

	const togglePlaying = (e: React.MouseEvent) => {
		if (isSelect) return;

		e.stopPropagation();

		if (audioRef.current) {
			if (audioRef.current.paused) {
				audioRef.current.play();
				setPlaying(true);
			} else {
				audioRef.current.pause();
				setPlaying(false);
			}
		}
	};

	const handleClickMessage = (e: React.MouseEvent) => {
		if (!message.audio) return;

		e.stopPropagation();
	};

	const handleClickLoadingButton = (e: React.MouseEvent) => {
		e.stopPropagation();

		handleCancelLoadingMessage(message);
	};

	const handleChangeProgress = (event: any, newValue: number | number[]) => {
		if (isSelect) return;

		if (audioRef.current) {
			const value = newValue as number;

			audioRef.current.currentTime = (audioRef.current.duration / 100) * value;
		}
	};

	const handleClickProgress = (e: React.MouseEvent) => {
		if (isSelect) return;

		e.stopPropagation();
	};

	return (
		<Paper className={classNames(classes.root, 'my-message')} onClick={handleClickMessage}>
			{message.audio && (
				<audio ref={audioRef}>
					<source
						src={`${process.env.REACT_APP_CLOUD_VIDEO_URI}/${message.audio}.mp3`}
						type='audio/mp3'
					/>
					<source
						src={`${process.env.REACT_APP_CLOUD_VIDEO_URI}/${message.audio}.mp3`}
						type='audio/mp4'
					/>
					<source
						src={`${process.env.REACT_APP_CLOUD_VIDEO_URI}/${message.audio}.ogg`}
						type='audio/ogg'
					/>
					<source
						src={`${process.env.REACT_APP_CLOUD_VIDEO_URI}/${message.audio}.mp4`}
						type='audio/aac'
					/>
					Your browser does not support the
					<code>audio</code> element.
				</audio>
			)}

			<div className={classes.leftBlock}>
				{message.audio && (
					<IconButton
						onClick={togglePlaying}
						className={classes.playButton}
						disableFocusRipple
						disableRipple
					>
						{playing && <PauseIcon className={classes.icon} fontSize='large' />}

						{!playing && <PlayArrowIcon className={classes.icon} fontSize='large' />}
					</IconButton>
				)}
				{!message.audio && (
					<IconButton
						color='primary'
						onClick={handleClickLoadingButton}
						className={classes.loadingButton}
						disableFocusRipple
						disableRipple
					>
						<CloseIcon className={classes.icon} fontSize='large' />

						<CircularProgress className={classes.loader} size={50} />
					</IconButton>
				)}
			</div>

			<div className={classes.rightBlock}>
				<Slider
					className={classes.slider}
					disabled={!message.audio}
					value={progress}
					onChange={handleChangeProgress}
					onClick={handleClickProgress}
				/>

				<Typography variant='caption'>
					{message.audio ? `${currentTime} / ${duration}` : '00:00 / 00:00'}
				</Typography>
			</div>

			<div className={classes.info}>
				<Typography variant='caption' className={classes.created}>
					{moment(message.created).format('LT')}
				</Typography>

				{message.isRead ? <DoneAllIcon fontSize='small' /> : <DoneIcon fontSize='small' />}
			</div>
		</Paper>
	);
};

export default AudioMessage;
