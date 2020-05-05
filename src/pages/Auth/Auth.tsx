import React, {useState, Suspense, lazy} from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';

import {login, register} from '@store/auth/actions';
import Loader from '@components/Loader';
import {ILoginInputs, IRegisterInputs} from './types';

const LoginForm = lazy(() => import('./components/LoginForm'));
const RegisterForm = lazy(() => import('./components/RegisterForm'));

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}));

const Auth: React.FC = () => {
	const classes = useStyles();

	const [value, setValue] = useState(0);

	const dispatch = useDispatch();

	const handleChange = (e: React.ChangeEvent<{}>, newValue: number): void => {
		setValue(newValue);
	};

	const handleLoginSubmit = async (user: ILoginInputs): Promise<any> => {
		const data: any = await dispatch(login(user));

		if (data.errors) {
			return data.errors[0];
		}
	};

	const handleRegisterSubmit = async (user: IRegisterInputs): Promise<any> => {
		const data: any = await dispatch(register(user));

		if (data.errors) {
			return data.errors[0];
		}
	};

	return (
		<section className={classes.root}>
			<Helmet>
				<title>Auth / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Paper className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab label='Login' />
					<Tab label='Register' />
				</Tabs>
			</Paper>
			<Suspense fallback={<Loader />}>
				{value === 0 && (
					<div style={{padding: 8 * 3}}>
						<LoginForm submit={handleLoginSubmit} />
					</div>
				)}
				{value === 1 && (
					<div style={{padding: 8 * 3}}>
						<RegisterForm submit={handleRegisterSubmit} />
					</div>
				)}
			</Suspense>
		</section>
	);
};

export default Auth;
