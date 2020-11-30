import React, {useState, lazy, Suspense} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Loader from '@components/common/loaders/Loader';
import General from './tabs/General';

const UserSettings = lazy(() => import('./tabs/UserSettings'));
const ChatSettings = lazy(() => import('./tabs/ChatSettings'));
const Advanced = lazy(() => import('./tabs/Advanced'));

const useStyles = makeStyles(theme => ({
	dialogTitle: {
		margin: 0,
		paddingTop: theme.spacing(2),
		paddingBotttom: theme.spacing(2),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
	},
	closeIcon: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
}));

type Props = {
	open: boolean;
	closeModal: () => void;
};

const SettingsModal: React.FC<Props> = ({open, closeModal}) => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [tab, setTab] = useState(0);

	const _handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number): void => {
		setTab(newValue);
	};

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen} fullWidth>
			<DialogTitle className={classes.dialogTitle} disableTypography>
				<Typography variant='h6'>Settings</Typography>

				<IconButton className={classes.closeIcon} onClick={closeModal} color='primary'>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<Tabs
					value={tab}
					indicatorColor='primary'
					textColor='primary'
					onChange={_handleChangeTab}
					variant='scrollable'
					scrollButtons='on'
				>
					<Tab label='General' />
					<Tab label='User settings' />
					<Tab label='Chat Settings' />
					<Tab label='Notifications' />
					<Tab label='Advanced' />
				</Tabs>
				<div style={{padding: 8 * 3}}>
					<Suspense fallback={<Loader />}>
						{tab === 0 && <General />}
						{tab === 1 && <UserSettings />}
						{tab === 2 && <ChatSettings />}
						{tab === 4 && <Advanced />}
					</Suspense>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsModal;
