import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import {RemoveMessage} from '@utils/hotKeys';

const useStyles = makeStyles({
	root: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftSide: {
		display: 'flex',
		alignItems: 'center',
	},
	rightSide: {
		display: 'flex',
		alignItems: 'center',
	},
	close: {
		marginRight: 10,
	},
});

type Props = {
	selectedMessages: number;
	closeAlterHeader: () => void;
	openRemoveMessagesModal: () => void;
};

const AlterHeader: React.FC<Props> = ({
	selectedMessages,
	closeAlterHeader,
	openRemoveMessagesModal,
}) => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.root}>
				<div className={classes.leftSide}>
					<IconButton className={classes.close} onClick={closeAlterHeader}>
						<CloseIcon />
					</IconButton>
					<span>
						{selectedMessages} message{selectedMessages === 1 ? <></> : <>s</>}
					</span>
				</div>
				<div className={classes.rightSide}>
					<IconButton onClick={openRemoveMessagesModal}>
						<DeleteIcon />
					</IconButton>
				</div>

				<RemoveMessage action={openRemoveMessagesModal} />
			</div>

			<Divider />
		</>
	);
};

export default AlterHeader;
