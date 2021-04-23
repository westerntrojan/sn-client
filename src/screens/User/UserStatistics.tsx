import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';

import Context from '@/screens/User/context';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	item: {
		textAlign: 'center',
		padding: 10,
		display: 'block',
		flex: 1,
	},
}));

const UserInfo: React.FC = () => {
	const classes = useStyles();

	const {user} = useContext(Context);

	const {articles, followers, following} = user.statistics;

	return (
		<Card className={classNames('user-statistics', classes.root)}>
			<ButtonBase className={classes.item}>
				<Typography variant='h5' color='primary'>
					{articles}
				</Typography>
				<Typography variant='subtitle1'>articles</Typography>
			</ButtonBase>
			<ButtonBase className={classes.item}>
				<Typography variant='h5' color='primary'>
					{followers}
				</Typography>
				<Typography variant='subtitle1'>followers</Typography>
			</ButtonBase>
			<ButtonBase className={classes.item}>
				<Typography variant='h5' color='primary'>
					{following}
				</Typography>
				<Typography variant='subtitle1'>following</Typography>
			</ButtonBase>
		</Card>
	);
};

export default UserInfo;
