import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Backdrop from '@material-ui/core/Backdrop';
import {useDispatch} from 'react-redux';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import {resetApp} from '@store/app/actions';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		right: 20,
		bottom: 86,
		zIndex: 1000,
	},
});

const actions = [{icon: <RotateLeftIcon />, name: 'Reset application'}];

const AdminButton: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();

	const handleClose = (): void => {
		setOpen(false);
	};

	const handleOpen = (): void => {
		setOpen(true);
	};

	const _handleResetApp = async (): Promise<void> => {
		await dispatch(resetApp());
	};

	return (
		<>
			<Backdrop open={open} style={{zIndex: 1000}} />

			<SpeedDial
				ariaLabel='Admin button'
				className={classes.root}
				open={open}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				direction='up'
			>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={_handleResetApp}
						tooltipOpen
					/>
				))}
			</SpeedDial>
		</>
	);
};

export default AdminButton;
