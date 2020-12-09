import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';

import {RemoveMessage, Close} from '@utils/hotKeys';
import CanvasContext from './CanvasContext';
import * as types from './reducer/types';

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
	close: {
		marginRight: 10,
	},
});

const AlterHeader: React.FC = () => {
	const classes = useStyles();

	const {
		state: {selectedMessages},
		dispatch,
	} = useContext(CanvasContext);

	return (
		<div className={classes.root}>
			<div className={classes.leftSide}>
				<IconButton
					className={classes.close}
					onClick={() => dispatch({type: types.CLEAR_SELECTED_MESSAGES})}
				>
					<CloseIcon />
				</IconButton>
				<span>
					{selectedMessages.length} message{selectedMessages.length === 1 ? '' : 's'}
				</span>
			</div>
			<div className={classes.rightSide}>
				<IconButton onClick={() => dispatch({type: types.OPEN_REMOVE_MESSAGES_MODAL})}>
					<DeleteIcon />
				</IconButton>
			</div>

			<Close action={() => dispatch({type: types.CLEAR_SELECTED_MESSAGES})} />
			<RemoveMessage action={() => dispatch({type: types.OPEN_REMOVE_MESSAGES_MODAL})} />
		</div>
	);
};

export default AlterHeader;
