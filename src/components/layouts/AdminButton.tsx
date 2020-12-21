import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Backdrop from '@material-ui/core/Backdrop';
import {useDispatch} from 'react-redux';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import {resetApp} from '@store/app/actions';
import useRedirect from '@utils/hooks/useRedirect';
import {SubmitModal} from '@utils/hotKeys';

type ResetAppModalProps = {
	open: boolean;
	closeModal: () => void;
	handleResetApp: () => void;
};

const ResetAppModal: React.FC<ResetAppModalProps> = ({open, closeModal, handleResetApp}) => {
	return (
		<Dialog open={open} onClose={closeModal}>
			<DialogTitle>Are you absolutely sure?</DialogTitle>

			<DialogContent>
				<DialogContentText>
					This action cannot be undone. Are you sure you want to remove this?
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button color='primary' onClick={closeModal}>
					Cancel
				</Button>

				<Button color='secondary' onClick={handleResetApp}>
					Reset
				</Button>
			</DialogActions>

			<SubmitModal action={handleResetApp} />
		</Dialog>
	);
};

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

const AdminButton: React.FC = () => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [resetAppModal, setResetAppModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const {redirectTo} = useRedirect();

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleResetApp = async (): Promise<void> => {
		setResetAppModal(false);
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
				<SpeedDialAction
					icon={<RotateLeftIcon />}
					tooltipTitle={'Reset application'}
					onClick={() => setResetAppModal(true)}
					tooltipOpen
				/>
			</SpeedDial>

			<ResetAppModal
				open={resetAppModal}
				closeModal={() => setResetAppModal(false)}
				handleResetApp={handleResetApp}
			/>
		</>
	);
};

export default AdminButton;
