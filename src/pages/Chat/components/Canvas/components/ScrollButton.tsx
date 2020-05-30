import React from 'react';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		right: 20,
		bottom: 20,
		width: 60,
		height: 60,
		zIndex: 1000,
		borderRadius: 100,

		border: '1px solid red',
	},
});

type Props = {
	open: boolean;
	action: () => void;
};

const ScrollButton: React.FC<Props> = ({open, action}) => {
	const classes = useStyles();

	return (
		<Slide in={open} direction='up'>
			<Button color='primary' variant='contained' className={classes.root} onClick={action}>
				<DownIcon fontSize='large' />
			</Button>
		</Slide>
	);
};

export default ScrollButton;
