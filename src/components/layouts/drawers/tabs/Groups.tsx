import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {useSelector, shallowEqual} from 'react-redux';

import MessageSkeleton from './MessageSkeleton';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import {RootState} from '@store/types';
import {useAuthModal} from '@utils/hooks';

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

const Groups: React.FC = () => {
	const classes = useStyles();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {openAuthModal} = useAuthModal();

	const handleAddGroup = (): void => {
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
				<ZoomTooltip title='Add group'>
					<IconButton color='primary' onClick={handleAddGroup}>
						<ControlPointIcon />
					</IconButton>
				</ZoomTooltip>
			</div>
		</List>
	);
};

export default Groups;
