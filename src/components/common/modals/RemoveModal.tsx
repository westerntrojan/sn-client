import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {UseMutateFunction} from 'react-query';

import {SubmitModal} from '@/utils/hotKeys';

type Props = {
	open: boolean;
	text: string;
	action: (() => void) | UseMutateFunction;
	closeModal: () => void;
};

const RemoveModal: React.FC<Props> = ({open, text, action, closeModal}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!open) {
			setLoading(false);
		}

		// eslint-disable-next-line
	}, [open]);

	const _handleAction = () => {
		setLoading(true);

		action();
	};

	return (
		<Dialog open={open} onClose={!loading ? closeModal : undefined} fullScreen={fullScreen}>
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeModal} disabled={loading} color='primary'>
					Cancel
				</Button>
				<Button color='secondary' disabled={loading} onClick={_handleAction}>
					Remove
				</Button>
			</DialogActions>

			<SubmitModal action={_handleAction} />
		</Dialog>
	);
};

export default RemoveModal;
