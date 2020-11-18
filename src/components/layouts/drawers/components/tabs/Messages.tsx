import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import MessageSkeleton from './components/MessageSkeleton';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';

const useStyles = makeStyles({
	list: {
		display: 'flex',
		flexDirection: 'column',
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
});

const Messages: React.FC = () => {
	const classes = useStyles();

	return (
		<List className={classes.list}>
			<ListItem>
				<MessageSkeleton />
			</ListItem>
			<ListItem>
				<MessageSkeleton />
			</ListItem>
			<ListItem>
				<MessageSkeleton />
			</ListItem>
			<ListItem>
				<MessageSkeleton />
			</ListItem>
			<ListItem>
				<MessageSkeleton />
			</ListItem>

			<div className={classes.buttonWrapper}>
				<ZoomTooltip title='Send message'>
					<IconButton color='primary'>
						<ControlPointIcon />
					</IconButton>
				</ZoomTooltip>
			</div>
		</List>
	);
};

export default Messages;
