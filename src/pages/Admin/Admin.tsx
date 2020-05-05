import React, {useState, Suspense, lazy} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';

import Loader from '@components/Loader';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const Dashboard = lazy(() => import('./Dashboard'));
const Categories = lazy(() => import('./Categories'));

const Admin: React.FC = () => {
	const classes = useStyles();

	const [value, setValue] = useState(0);

	const handleChange = (e: React.ChangeEvent<{}>, newValue: number): void => {
		setValue(newValue);
	};

	return (
		<section className='admin'>
			<Helmet>
				<title>Admin / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Paper className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab label='dashboard' />
					<Tab label='categories' />
				</Tabs>
			</Paper>
			<Suspense fallback={<Loader />}>
				{value === 0 && (
					<div style={{padding: 8 * 3}}>
						<Dashboard />
					</div>
				)}
				{value === 1 && (
					<div style={{padding: 8 * 3}}>
						<Categories />
					</div>
				)}
			</Suspense>
		</section>
	);
};

export default Admin;
