import React, {useState, lazy, Suspense} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Loader from '@components/Loader';
import General from './tabs/General';

const UserSettings = lazy(() => import('./tabs/UserSettings'));
const ChatSettings = lazy(() => import('./tabs/ChatSettings'));
const Advanced = lazy(() => import('./tabs/Advanced'));

type Props = {
	open: boolean;
	closeModal: () => void;
};

const SettingsModal: React.FC<Props> = ({open, closeModal}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [tab, setTab] = useState(0);

	const _handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number): void => {
		setTab(newValue);
	};

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen} fullWidth={true}>
			<DialogTitle>Settings</DialogTitle>

			<DialogContent>
				<Tabs
					value={tab}
					indicatorColor='primary'
					textColor='primary'
					onChange={_handleChangeTab}
					variant='scrollable'
					scrollButtons='auto'
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
