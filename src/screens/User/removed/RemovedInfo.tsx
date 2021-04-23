import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';

import {IUser} from '@/store/types';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	titleBlock: {
		marginBottom: 5,
	},
	textBlock: {
		marginTop: 10,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		width: 250,
	},
}));

type Props = {
	user: IUser;
};

const RemovedInfo: React.FC<Props> = ({user}) => {
	const classes = useStyles();

	return (
		<Card className={classNames('user-info', classes.root)}>
			<CardContent>
				<div className={classes.titleBlock}>
					<Typography variant='h5'>{`${user.firstName} ${user.lastName}`.trim()}</Typography>
					<Typography variant='subtitle1'>Page removed</Typography>
				</div>

				<Divider />

				<div className={classes.textBlock}>
					<Typography className={classes.text}>
						User page removed. Information is not available
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
};

export default RemovedInfo;
