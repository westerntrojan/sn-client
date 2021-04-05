import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {useSelector, shallowEqual} from 'react-redux';

import MessageSkeleton from './MessageSkeleton';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import {useAuthModal} from '@utils/hooks';
import {RootState} from '@store/types';

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

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {openAuthModal} = useAuthModal();

	const handleSendMessage = () => {
		if (!auth.isAuth) {
			openAuthModal();
		}
	};

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
					<IconButton color='primary' onClick={handleSendMessage}>
						<ControlPointIcon />
					</IconButton>
				</ZoomTooltip>
			</div>
		</List>
	);
};

export default Messages;
