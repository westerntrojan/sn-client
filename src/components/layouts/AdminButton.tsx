import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Backdrop from '@material-ui/core/Backdrop';
import {useDispatch} from 'react-redux';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CircularProgress from '@material-ui/core/CircularProgress';

import {resetApp} from '@store/app/actions';
import {useRedirect} from '@utils/hooks';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'fixed',
		right: 20,
		bottom: 86,
		zIndex: 1000,
	},
	loadingBackdrop: {
		zIndex: theme.zIndex.drawer + 3,
	},
	backdrop: {
		zIndex: 1000,
	},
}));

const actions = [{icon: <RotateLeftIcon />, name: 'Reset application'}];

const AdminButton: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const redirectTo = useRedirect();

	const handleClose = (): void => {
		setOpen(false);
	};

	const handleOpen = (): void => {
		setOpen(true);
	};

	const _handleResetApp = async (): Promise<void> => {
		setLoading(true);

		await dispatch(resetApp());

		redirectTo('/');
	};

	return (
		<>
			<Backdrop open={loading} className={classes.loadingBackdrop}>
				<CircularProgress color='primary' />
			</Backdrop>

			<Backdrop open={open} className={classes.backdrop} />

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
