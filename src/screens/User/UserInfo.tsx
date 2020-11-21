import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Context from '@screens/User/context';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
		display: 'flex',
		flexDirection: 'column',
	},
	titleBlock: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	notInfoBlock: {
		padding: '20px 0',
		textAlign: 'center',
	},
	item: {
		padding: '5px 0',
	},
}));

const UserInfo: React.FC = () => {
	const classes = useStyles();

	const {user} = useContext(Context);

	return (
		<Card className={classNames('user-info', classes.root)}>
			<CardContent>
				<div className={classes.titleBlock}>
					<Typography variant='h5'>{`${user.firstName} ${user.lastName}`.trim()}</Typography>

					<Typography variant='subtitle2' color='primary'>
						Online
					</Typography>
				</div>

				<Divider />

				{user.username || user.bio ? (
					<div>
						<List component='nav' aria-label='main mailbox folders'>
							{user.username && (
								<>
									<ListItem>
										<ListItemText primary='Username' secondary={user.username} />
									</ListItem>

									<Divider />
								</>
							)}

							{user.bio && (
								<>
									<ListItem>
										<ListItemText primary='Bio' secondary={user.bio} />
									</ListItem>

									<Divider />
								</>
							)}
						</List>
					</div>
				) : (
					<div className={classes.notInfoBlock}>
						<Typography>No information about yourself.</Typography>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default UserInfo;
