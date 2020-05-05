import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '10px 0',
		display: 'flex',
		justifyContent: 'flex-end',
		borderRadius: theme.shape.borderRadius,
		cursor: 'pointer',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
		'& .MuiCard-root': {
			width: 'fit-content',
			borderRadius: '5px',
			minWidth: '200px',
			maxWidth: '100%',
			backgroundColor: theme.palette.primary.main,
			'& .MuiCardContent-root': {
				padding: '5px 10px',
			},
			'& .MuiCardActions-root': {
				padding: '5px 10px',
			},
		},
	},
	selectedMessage: {
		backgroundColor: 'rgba(0, 0, 0, .2)',
		'& .MuiCard-root': {
			backgroundColor: 'rgba(0, 0, 0, .3)',
		},
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',

		'& button': {
			marginRight: '10px',
		},
	},
}));

type Props = {
	message: {
		_id: string;
		user: {
			_id: string;
		};
		text: string;
		created: string;
	};
	alterHeader: boolean;
	selectMessage: (_id: string) => void;
};

const MyMessage: React.FC<Props> = ({message, alterHeader, selectMessage}) => {
	const classes = useStyles();
	const [select, setSelect] = useState(false);

	useEffect(() => {
		if (!alterHeader) {
			setSelect(false);
		}
	}, [alterHeader]);

	const _handleSelect = (): void => {
		setSelect(!select);
		selectMessage(message._id);
	};

	return (
		<Paper
			className={classNames('my-message', classes.root, {
				[classes.selectedMessage]: select,
			})}
			onClick={_handleSelect}
		>
			<Card>
				<CardContent>
					<Typography>{message.text}</Typography>
				</CardContent>
				<CardActions className={classes.actions}>
					<div className={'buttons'}></div>

					<div className={classes.info}>
						<Typography className={'small'}>{moment(message.created).format('LT')}</Typography>
					</div>
				</CardActions>
			</Card>
		</Paper>
	);
};

export default MyMessage;
