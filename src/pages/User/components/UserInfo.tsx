import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import {IconButton} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useSnackbar} from 'notistack';

import ZoomTooltip from '@components/tooltips/ZoomTooltip';
import {IUser} from '@store/types';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		wordWrap: 'break-word',
		display: 'flex',
		flexDirection: 'column',
	},
	titleBlock: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	notInfoBlock: {
		padding: '20px 0',
		textAlign: 'center',
	},
	item: {
		padding: '5px 0',
	},
	linkIcon: {
		transform: 'rotate(135deg)',
	},
}));

type Props = {
	user: IUser;
};

const UserInfo: React.FC<Props> = ({user}) => {
	const classes = useStyles();

	const {enqueueSnackbar} = useSnackbar();

	const _handleClickCopyLink = (): void => {
		enqueueSnackbar('Link copied successfully', {variant: 'success', preventDuplicate: true});
	};

	return (
		<Card className={classNames('user-info', classes.root)}>
			<CardContent>
				<div className={classes.titleBlock}>
					<Typography variant='h5'>
						{`${user.firstName} ${user.lastName}`.trim()}
						<ZoomTooltip title='Copy link'>
							<CopyToClipboard text={window.location.href} onCopy={_handleClickCopyLink}>
								<IconButton color='primary'>
									<LinkIcon className={classes.linkIcon} />
								</IconButton>
							</CopyToClipboard>
						</ZoomTooltip>
					</Typography>

					<Typography variant='subtitle2' color='primary'>
						Online
					</Typography>
				</div>

				<Divider />

				{user.info ? (
					<div>
						<List component='nav' aria-label='main mailbox folders'>
							{user.info.bio && (
								<>
									<ListItem>
										<ListItemText primary='Bio' secondary={user.info.bio} />
									</ListItem>

									<Divider />
								</>
							)}

							{user.username && (
								<>
									<ListItem>
										<ListItemText primary='Username' secondary={user.username} />
									</ListItem>

									<Divider />
								</>
							)}
						</List>
					</div>
				) : (
					<div className={classes.notInfoBlock}>
						<Typography>No information about yourself.</Typography>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default UserInfo;
