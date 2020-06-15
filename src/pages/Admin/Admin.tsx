import React, {useState, Suspense, lazy} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';

import Loader from '@components/Loader';
import Dashboard from './Dashboard';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
	},
});

const Categories = lazy(() => import('./Categories'));

const Admin: React.FC = () => {
	const classes = useStyles();

	const [tab, setTab] = useState(0);

	const _handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number): void => {
		setTab(newValue);
	};

	return (
		<section className='admin'>
			<Helmet>
				<title>Admin / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Paper className={classes.root}>
				<Tabs
					value={tab}
					onChange={_handleChangeTab}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab label='dashboard' />
					<Tab label='categories' />
				</Tabs>
			</Paper>
			<div style={{padding: 8 * 3}}>
				<Suspense fallback={<Loader />}>
					{tab === 0 && <Dashboard />}
					{tab === 1 && <Categories />}
				</Suspense>
			</div>
		</section>
	);
};

export default Admin;
