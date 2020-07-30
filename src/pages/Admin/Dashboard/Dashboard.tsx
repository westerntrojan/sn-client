import React from 'react';
import {Helmet} from 'react-helmet';
import {Bar} from 'react-chartjs-2';

import {IDashboardData} from '@pages/Admin/types';

type Props = {
	data: IDashboardData;
};

const Dashboard: React.FC<Props> = ({data}) => {
	const statistics = {
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

			<Bar data={statistics.views} width={100} height={60} />
			<Bar data={statistics.comments} width={100} height={60} />
		</section>
	);
};

export default Dashboard;
