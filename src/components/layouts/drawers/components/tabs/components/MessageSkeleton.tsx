import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	messageData: {
		width: '70%',
	},
});
const MessageSkeleton: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Skeleton variant='circle' animation={false} width={50} height={50} />

			<div className={classes.messageData}>
				<Skeleton
					variant='text'
					animation={false}
					width='100%'
					height={15}
					style={{marginBottom: 10}}
				/>
				<Skeleton variant='text' animation={false} width='60%' height={15} />
			</div>
		</div>
	);
};

export default MessageSkeleton;
