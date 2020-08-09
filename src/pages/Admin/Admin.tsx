import React, {useState, Suspense, lazy, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';

import Loader from '@components/loaders/Loader';
import callApi from '@utils/callApi';
import Dashboard from './Dashboard';
import {IDashboardData} from './types';

const Categories = lazy(() => import('./Categories'));

const Admin: React.FC = () => {
	const [tab, setTab] = useState(0);
	const [dashboardData, setDashboardData] = useState<IDashboardData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const data: IDashboardData = await callApi.get('/data/statistics/articles');

			setDashboardData(data);
			setLoading(false);
		};
		fetchData();
	}, []);

	const _handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number): void => {
		setTab(newValue);
	};

	return (
		<section className='admin'>
			<Helmet>
				<title>Admin / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Paper>
				<Tabs
					value={tab}
					onChange={_handleChangeTab}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab label='dashboard' disabled={loading} />
					<Tab label='categories' disabled={loading} />
				</Tabs>
			</Paper>
			<div style={{padding: 8 * 3}}>
				<Suspense fallback={<Loader />}>
					{loading && <Loader />}

					{!loading && dashboardData && (
						<>
							{tab === 0 && <Dashboard data={dashboardData} />}
							{tab === 1 && <Categories />}
						</>
					)}
				</Suspense>
			</div>
		</section>
	);
};

export default Admin;
