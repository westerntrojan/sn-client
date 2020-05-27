import React, {useState, Suspense, lazy} from 'react';
import {useDispatch} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';

import './style.scss';
import {login, sendCode} from '@store/auth/actions';
import Loader from '@components/Loader';
import callApi from '@utils/callApi';
import {ILoginInputs, IRegisterInputs} from './types';
import Context from './context';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const Auth: React.FC = () => {
	const [tab, setTab] = useState(0);
	const [userId, setUserId] = useState('');

	const dispatch = useDispatch();

	const _handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number): void => {
		setTab(newValue);
	};

	const handleSubmitLogin = async (user: ILoginInputs): Promise<any> => {
		const data: any = await dispatch(login(user));

		if (data.twoFactorAuth) {
			setUserId(data.userId);
		}

		return data;
	};

	const handleSubmitRegister = async (user: IRegisterInputs): Promise<any> => {
		const data = await callApi.post('/auth/register', user);

		return data;
	};

	const handleSubmitCode = async (code: string): Promise<any> => {
		const data = await dispatch(sendCode(userId, code));

		return data;
	};

	return (
		<section className='auth'>
			<Helmet>
				<title>Auth / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Paper>
				<Tabs
					value={tab}
					onChange={_handleChangeTab}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab label='Login' />
					<Tab label='Register' />
				</Tabs>
			</Paper>
			<div style={{padding: 8 * 3}} className='content'>
				<Context.Provider value={{submitCode: handleSubmitCode}}>
					<Suspense fallback={<Loader />}>
						{tab === 0 && <Login submit={handleSubmitLogin} />}
						{tab === 1 && <Register submit={handleSubmitRegister} />}
					</Suspense>
				</Context.Provider>
			</div>
		</section>
	);
};

export default Auth;
