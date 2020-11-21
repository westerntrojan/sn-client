import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import Divider from '@material-ui/core/Divider';

import Context from '@screens/Chat/context';

const useStyles = makeStyles({
	root: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftSide: {
		display: 'flex',
		alignItems: 'center',
	},
	rightSide: {
		display: 'flex',
		alignItems: 'center',
	},
	arrowBack: {
		marginRight: 10,
	},
	activeUsers: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: 5,
	},
});

const Header: React.FC = () => {
	const classes = useStyles();

	const {activeUsers} = useContext(Context);

	return (
		<>
			<div className={classes.root}>
				<div className={classes.leftSide}>
					<span className={classes.activeUsers}>
						<GroupIcon className={classes.icon} />
						{activeUsers}
					</span>
				</div>
				<div className={classes.rightSide}>
					<IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<Divider />
		</>
	);
};

export default Header;
