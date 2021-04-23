import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import Avatar from '@material-ui/core/Avatar';

import {IGroup} from '@/screens/Group/types';

const getCorrentGroupName = (name: string) => {
	return name
		.split(' ')
		.slice(0, 2)
		.map(i => i[0])
		.join('')
		.toUpperCase();
};

const useStyles = makeStyles({
	root: {
		wordWrap: 'break-word',
	},
	inline: {
		display: 'inline',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginRight: 10,
	},
	text: {
		color: grey[500],
		marginRight: 10,
	},
	lastMessage: {
		display: 'flex',
		alignItems: 'center',
	},
	lastMessageText: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',

		maxWidth: 600,
	},
});

type Props = {
	group: IGroup;
};

const GroupItem: React.FC<Props> = ({group}) => {
	const classes = useStyles();

	return (
		<>
			<ListItem
				button
				alignItems='flex-start'
				component={RouterLink}
				to={`/group/${group._id}`}
				className={classes.root}
			>
				<ListItemAvatar>
					<Avatar style={{background: group.avatar.color}}>
						{getCorrentGroupName(group.name)}
					</Avatar>
				</ListItemAvatar>

				<ListItemText
					disableTypography
					primary={
						<div className={classes.title}>
							<Typography variant='subtitle1'>{group.name}</Typography>
						</div>
					}
				/>
			</ListItem>

			<Divider variant='inset' />
		</>
	);
};

export default GroupItem;
