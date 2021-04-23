import React, {useEffect, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {useSnackbar} from 'notistack';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';

import {RootState} from '@/store/types';

const useStyles = makeStyles({
	alert: {
		marginBottom: 20,
	},
});

const AppSubscriptions: React.FC = () => {
	const classes = useStyles();

	const app = useSelector((state: RootState) => state.app, shallowEqual);

	const [online, setOnline] = useState(true);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		setOnline(navigator.onLine);

		const handleOnline = () => setOnline(true);
		const handleOffline = () => setOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	useEffect(() => {
		if (app.networkError) {
			enqueueSnackbar('Something went wrong', {
				variant: 'warning',
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'left',
				},
				action: (
					<Button color='inherit' size='small' onClick={() => window.location.reload()}>
						Reload
					</Button>
				),
			});
		}
	}, [app.networkError]);

	return (
		<>
			<Collapse in={!online}>
				<Alert
					className={classes.alert}
					severity='warning'
					variant='filled'
					action={
						<Button color='inherit' size='small' onClick={() => window.location.reload()}>
							Reload
						</Button>
					}
				>
					Internet connection is lost
				</Alert>
			</Collapse>
		</>
	);
};

export default AppSubscriptions;
