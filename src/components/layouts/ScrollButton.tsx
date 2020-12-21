import React from 'react';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		right: 20,
		bottom: 20,
		zIndex: 999,
	},
});

type Props = {
	open: boolean;
};

const ScrollButton: React.FC<Props> = ({open}) => {
	const classes = useStyles();

	const executeScrollUp = () => {
		const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || 'true');

		if (enableAnimations) {
			window.scrollTo({top: 0, behavior: 'smooth'});
		} else {
			window.scrollTo({top: 0});
		}
	};

	return (
		<Slide in={open} direction='up'>
			<Fab color='primary' className={classes.root} onClick={executeScrollUp}>
				<UpIcon fontSize='large' />
			</Fab>
		</Slide>
	);
};

export default ScrollButton;
