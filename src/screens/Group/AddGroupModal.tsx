import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';
import callApi from '@/utils/callApi';
import {useSelector, shallowEqual} from 'react-redux';

import {RootState, IUser} from '@/store/types';
import UserAvatar from '@/components/common/avatars/UserAvatar';
import Loader from '@/components/common/loaders/Loader';

const useStyles = makeStyles(theme => ({
	root: {},
	title: {
		marginBottom: 10,
	},
	usersList: {
		overflow: 'auto',
		maxHeight: 500,
		textAlign: 'center',
	},
	selectedAvatar: {
		border: `3px solid ${theme.palette.primary.main}`,
	},
}));

type Props = {
	open: boolean;
	handleSubmit: ({name, members}: {name: string; members: string[]}) => void;
	closeModal: () => void;
};

const AddGroupModal: React.FC<Props> = ({open, handleSubmit, closeModal}) => {
	const classes = useStyles();

	const [activeStep, setActiveStep] = useState(0);
	const [name, setName] = useState('');
	const [members, setMembers] = useState<string[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(true);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		const fetchUsers = async () => {
			const data = await callApi.get(`/users/following/${auth.user._id}`);

			setUsers(data.users);
			setLoadingUsers(false);
		};
		fetchUsers();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (open) {
			setActiveStep(0);
			setName('');
			setMembers([]);
		}
	}, [open]);

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleToggleMember = (selectedMember: string) => {
		if (members.includes(selectedMember)) {
			setMembers(members.filter(member => member !== selectedMember));
		} else {
			if (members.length < 20) {
				setMembers(members.concat(selectedMember));
			}
		}
	};

	const handleCancel = () => {
		if (activeStep === 0) {
			closeModal();
		} else {
			setActiveStep(prevActiveStep => prevActiveStep - 1);
		}
	};

	const handleNext = () => {
		if (!name.trim()) {
			enqueueSnackbar('Group name is required', {variant: 'error'});
		} else {
			setActiveStep(prevActiveStep => prevActiveStep + 1);
		}
	};

	const handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.key === 'Enter') {
			handleNext();
		}
	};

	const handleCreate = () => {
		if (!members.length) {
			enqueueSnackbar('Members is required', {variant: 'error'});
		} else {
			handleSubmit({name, members});
		}
	};

	return (
		<Dialog open={open} onClose={handleCancel} className={classes.root} maxWidth='xs' fullWidth>
			<DialogContent>
				{activeStep === 0 && (
					<TextField
						label='Group name'
						value={name}
						onChange={handleChangeName}
						onKeyPress={handleKeyPressInput}
						autoFocus
						fullWidth
					/>
				)}

				{activeStep === 1 && (
					<div>
						<Typography variant='subtitle1' className={classes.title}>
							Add members <Typography variant='caption'>{members.length + 1} / 20</Typography>
						</Typography>

						<List className={classes.usersList}>
							{loadingUsers && <Loader />}

							{!loadingUsers &&
								Boolean(users.length) &&
								users.map(user => (
									<ListItem
										key={user._id}
										button
										onClick={() => handleToggleMember(user._id)}
										selected={members.includes(user._id)}
									>
										<ListItemAvatar>
											<UserAvatar
												user={user}
												className={members.includes(user._id) ? classes.selectedAvatar : ''}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={
												<Typography
													variant='body1'
													color={members.includes(user._id) ? 'primary' : 'inherit'}
												>
													{user.firstName} {user.lastName}
												</Typography>
											}
											secondary={user.username}
										/>
									</ListItem>
								))}

							{!loadingUsers && !Boolean(users.length) && (
								<Typography variant='body2'>No following</Typography>
							)}
						</List>
					</div>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} color='primary'>
					Cancel
				</Button>

				{activeStep === 0 && (
					<Button onClick={handleNext} color='primary'>
						Next
					</Button>
				)}

				{activeStep === 1 && (
					<Button color='primary' onClick={handleCreate}>
						Create
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default AddGroupModal;
