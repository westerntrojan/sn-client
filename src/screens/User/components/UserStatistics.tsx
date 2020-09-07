import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import {IUserStatistics} from '@screens/User/types';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		padding: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	item: {
		textAlign: 'center',
		margin: '0 20px',
	},
}));

type Props = {
	user: IUserStatistics;
};

const UserInfo: React.FC<Props> = ({user}) => {
	const classes = useStyles();

	const {articles, comments, messages} = user.statistics;

	return (
		<Card className={classNames('user-statistics', classes.root)}>
			<div className={classes.item}>
				<Typography variant='h5' color='primary'>
					{articles}
				</Typography>
				<Typography variant='subtitle1'>articles</Typography>
			</div>
			<div className={classes.item}>
				<Typography variant='h5' color='primary'>
					{comments}
				</Typography>
				<Typography variant='subtitle1'>comments</Typography>
			</div>
			<div className={classes.item}>
				<Typography variant='h5' color='primary'>
					{messages}
				</Typography>
				<Typography variant='subtitle1'>messages</Typography>
			</div>
		</Card>
	);
};

export default UserInfo;
