import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Bar} from 'react-chartjs-2';
import {IFetchData} from './types';

import callApi from '@utils/callApi';

const API = '/data';

const Dashboard: React.FC = () => {
	const [data, setData] = useState<IFetchData | null>(null);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const data: IFetchData = await callApi.get(`${API}/statistics/articles`);

			setData(data);
		};
		fetchData();
	}, []);

	const statistics = data && {
		views: {
			labels: data.labels,
			datasets: [
				{
					label: 'Views',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: data.views,
				},
			],
		},
		comments: {
			labels: data.labels,
			datasets: [
				{
					label: 'Comments',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: data.comments,
				},
			],
		},
	};

	return (
		<section className='dashboard'>
			<Helmet>
				<title>Dashboard / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{statistics && (
				<>
					<Bar data={statistics.views} width={100} height={60} />
					<Bar data={statistics.comments} width={100} height={60} />
				</>
			)}
		</section>
	);
};

export default Dashboard;
