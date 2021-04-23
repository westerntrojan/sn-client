import React, {useState, Suspense, lazy} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';
import {useQuery} from 'react-apollo';
import {loader} from 'graphql.macro';
import _ from 'lodash';

import Loader from '@/components/common/loaders/Loader';
import Dashboard from './tabs/Dashboard';
import {IDashboardData} from './types';

const GetArticleStatistics = loader('./gql/GetArticleStatistics.gql');

const Categories = lazy(() => import('./tabs/Categories'));

const Admin: React.FC = () => {
	const [tab, setTab] = useState(0);

	const {loading, data} = useQuery<{articleStatistics: IDashboardData}>(GetArticleStatistics, {
		fetchPolicy: 'cache-and-network',
	});

	const _handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number) => {
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
					{loading && _.isEmpty(data) && <Loader />}

					{data && (
						<>
							{tab === 0 && <Dashboard data={data.articleStatistics} />}
							{tab === 1 && <Categories />}
						</>
					)}
				</Suspense>
			</div>
		</section>
	);
};

export default Admin;
