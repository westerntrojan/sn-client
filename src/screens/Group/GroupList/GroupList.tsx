import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import GroupItem from './GroupItem';
import {IGroup} from '@/screens/Group/types';
import ZoomTooltip from '@/components/common/tooltips/ZoomTooltip';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		textAlign: 'center',
	},
	notInfoBlock: {
		textAlign: 'center',
		marginTop: 20,
	},
	addGroupButton: {
		margin: 20,
	},
}));

type Props = {
	groups: IGroup[];
	query: string;
	handleAddGroup: () => void;
};

const GroupList: React.FC<Props> = ({groups, query, handleAddGroup}) => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{_.isEmpty(groups) ? (
				<div className={classes.notInfoBlock}>
					<Typography>Chat list is empty</Typography>
				</div>
			) : (
				groups.map(group => <GroupItem key={group._id} group={group} />)
			)}

			<ZoomTooltip title='Add group'>
				<IconButton color='primary' className={classes.addGroupButton} onClick={handleAddGroup}>
					<AddCircleOutlineIcon />
				</IconButton>
			</ZoomTooltip>
		</List>
	);
};

export default GroupList;
