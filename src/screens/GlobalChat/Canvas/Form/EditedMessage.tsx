import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import CanvasContext from '@/screens/GlobalChat/Canvas/CanvasContext';
import * as types from '@/screens/GlobalChat/Canvas/reducer/types';

const useStyles = makeStyles({
	root: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		padding: 4,
		display: 'flex',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		overflow: 'hidden',
	},
});

const EditedMessage: React.FC = () => {
	const classes = useStyles();

	const {
		state: {editedMessage},
		dispatch,
	} = useContext(CanvasContext);

	return (
		<Paper className={classes.root}>
			<IconButton color='primary'>
				<EditIcon />
			</IconButton>

			<div className={classes.content}>
				<Typography color='primary' variant='caption'>
					Edit message
				</Typography>

				<Typography>{editedMessage.text}</Typography>
			</div>

			<IconButton onClick={() => dispatch({type: types.REMOVE_EDITED_MESSAGE})}>
				<CloseIcon />
			</IconButton>
		</Paper>
	);
};

export default EditedMessage;
