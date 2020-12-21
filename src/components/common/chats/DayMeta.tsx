import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		padding: '5px 0',
		userSelect: 'none',
		zIndex: -1,
	},
	wrapper: {
		padding: '6px 12px',
		borderRadius: 20,
		backgroundColor: '#00000033',
	},
	date: {
		color: 'white',
	},
});

type Props = {
	date: string;
};

const DayMeta: React.FC<Props> = ({date}) => {
	const classes = useStyles();

	const showYear = new Date(date).getFullYear() !== new Date().getFullYear();

	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<Typography variant='body2' className={classes.date}>
					{showYear ? moment(date).format('MMMM D, YYYY') : moment(date).format('MMMM D')}
				</Typography>
			</div>
		</div>
	);
};

export default DayMeta;
