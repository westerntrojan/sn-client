import React, {useState} from 'react';
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

import {login, sendCode} from '@store/auth/actions';
import Login from './components/Login';
import Register from './components/Register';
import callApi from '@utils/callApi';
import {ILoginInputs, IRegisterInputs} from './types';
import Context from './context';

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

	const [tab, setTab] = useState(0);
	const [userId, setUserId] = useState('');

	const dispatch = useDispatch();

	const _handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number): void => {
		setTab(newValue);
	};

	const handleSubmitLogin = async (userData: ILoginInputs): Promise<any> => {
		const data: any = await dispatch(login(userData));

		if (data.success) {
			closeModal();
		} else if (data.twoFactorAuth) {
			setUserId(data.userId);
		}

		return data;
	};

	const handleSubmitRegister = async (userData: IRegisterInputs): Promise<any> => {
		const data = await callApi.post('/auth/register', userData);

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
						{tab === 0 && <Login submit={handleSubmitLogin} />}
						{tab === 1 && <Register submit={handleSubmitRegister} />}
					</Context.Provider>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
