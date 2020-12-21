import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import 'react-lazy-load-image-component/src/effects/blur.css';
import LinkIcon from '@material-ui/icons/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import copy from 'copy-to-clipboard';
import {useSnackbar} from 'notistack';
import {TelegramShareButton, FacebookShareButton, TwitterShareButton} from 'react-share';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		'& .MuiList-root': {
			display: 'flex',
			flexDirection: 'column',
		},
	},
});

type Props = {
	anchorEl: HTMLElement | null;
	closeMenu: () => void;
	url: string;
};

const ShareMenu: React.FC<Props> = ({anchorEl, closeMenu, url}) => {
	const classes = useStyles();

	const {enqueueSnackbar} = useSnackbar();

	const copyToClipboard = () => {
		copy(url);

		enqueueSnackbar('Link copied to clipboard', {variant: 'success'});

		closeMenu();
	};

	return (
		<Menu
			anchorEl={anchorEl}
			className={classes.root}
			open={Boolean(anchorEl)}
			onClose={closeMenu}
			keepMounted
		>
			<MenuItem onClick={copyToClipboard}>
				<ListItemIcon>
					<LinkIcon />
				</ListItemIcon>
				<ListItemText primary='Link' />
			</MenuItem>
			<TelegramShareButton url={url}>
				<MenuItem onClick={closeMenu}>
					<ListItemIcon>
						<TelegramIcon />
					</ListItemIcon>
					<ListItemText primary='Telegram' />
				</MenuItem>
			</TelegramShareButton>
			<FacebookShareButton url={url}>
				<MenuItem onClick={closeMenu}>
					<ListItemIcon>
						<FacebookIcon />
					</ListItemIcon>
					<ListItemText primary='Facebook' />
				</MenuItem>
			</FacebookShareButton>
			<TwitterShareButton url={url}>
				<MenuItem onClick={closeMenu}>
					<ListItemIcon>
						<TwitterIcon />
					</ListItemIcon>
					<ListItemText primary='Twitter' />
				</MenuItem>
			</TwitterShareButton>
		</Menu>
	);
};

export default ShareMenu;
