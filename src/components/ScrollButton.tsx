import React from 'react';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		right: 20,
		bottom: 20,
		width: 60,
		height: 60,
		zIndex: 1000,
		borderRadius: 100,
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
			<Button
				color='primary'
				variant='contained'
				className={classNames(classes.root, 'button')}
				onClick={action}
			>
				<UpIcon fontSize='large' />
			</Button>
		</Slide>
	);
};

export default ScrollButton;
