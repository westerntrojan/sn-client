import React, {useState, Suspense, lazy} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import {TransitionProps} from '@material-ui/core/transitions';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';

import Loader from '@/components/common/loaders/Loader';
import {login, sendCode} from '@/store/auth/actions';
import Login from './tabs/Login';
import callApi from '@/utils/callApi';
import {ILoginInputs, IRegisterInputs} from './types';
import Context from './context';

const Register = lazy(() => import('./tabs/Register'));

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {children?: React.ReactElement},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	root: {
		padding: 20,
	},
	appBar: {
		position: 'relative',
		boxShadow: 'none',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
}));

type Props = {
	open: boolean;
	closeModal: () => void;
};

const AuthModal: React.FC<Props> = ({open, closeModal}) => {
	const classes = useStyles();

	const history = useHistory();

	const [tab, setTab] = useState(0);
	const [userId, setUserId] = useState('');

	const dispatch = useDispatch();

	const _handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number) => {
		setTab(newValue);
	};

	const handleSubmitLogin = async (user: ILoginInputs): Promise<any> => {
		const data: any = await dispatch(login(user));

		if (data.success) {
			closeModal();

			if (window.location.pathname.split('/').includes('verify')) {
				history.push('/');
			}
		} else if (data.twoFactorAuth) {
			setUserId(data.userId);
		}

		return data;
	};

	const handleSubmitRegister = async (user: IRegisterInputs): Promise<any> => {
		const registerUri = window.location.protocol + '//' + window.location.host + '/register/verify';

		const data = await callApi.post('/auth/register', {user, registerUri});

		return data;
	};

	const handleSubmitCode = async ({
		code,
		rememberMe,
	}: {
		code: string;
		rememberMe: boolean;
	}): Promise<any> => {
		const data: any = await dispatch(sendCode({userId, code, rememberMe}));

		if (data.success) {
			closeModal();
		}

		return data;
	};

	return (
		<Dialog open={open} onClose={closeModal} TransitionComponent={Transition} fullScreen>
			<AppBar className={classes.appBar} color='transparent'>
				<Toolbar className={classes.toolbar}>
					<IconButton color='primary' onClick={closeModal}>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent>
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
					<Context.Provider value={{handleSubmitCode}}>
						<Suspense fallback={<Loader />}>
							{tab === 0 && <Login submit={handleSubmitLogin} />}
							{tab === 1 && <Register submit={handleSubmitRegister} />}
						</Suspense>
					</Context.Provider>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
