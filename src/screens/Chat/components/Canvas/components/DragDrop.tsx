import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1001,
		backgroundColor: 'black',
		border: '1px solid red',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'white',
	},
});

type Props = {
	visible: boolean;
};

const DragDrop: React.FC<Props> = ({visible}) => {
	const classes = useStyles();

	return (
		<div className={classes.root} style={{display: visible ? 'flex' : 'none'}}>
			<h1 className={classes.title}>DragDrop</h1>
		</div>
	);
};

export default DragDrop;
