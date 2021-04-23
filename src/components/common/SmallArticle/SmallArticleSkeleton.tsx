import React from 'react';
import MuiSkeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
	root: {
		marginBottom: 20,

		'&:last-child': {
			marginBottom: 0,
		},
	},
	info: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

export const Skeleton: React.FC = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<MuiSkeleton variant='circle'>
						<Avatar />
					</MuiSkeleton>
				}
				title={
					<Typography variant='body2'>
						<MuiSkeleton width={90} />
					</Typography>
				}
				subheader={<MuiSkeleton width={60} />}
			/>

			<MuiSkeleton variant='rect' height={240} />

			<CardContent>
				<Typography variant='h5'>
					<MuiSkeleton />
				</Typography>
				<Typography variant='h5' style={{marginBottom: 20}}>
					<MuiSkeleton width='40%' />
				</Typography>

				<Typography>
					<MuiSkeleton />
				</Typography>
				<Typography>
					<MuiSkeleton width='80%' />
				</Typography>
				<Typography>
					<MuiSkeleton width='60%' />
				</Typography>
				<Typography>
					<MuiSkeleton width='40%' />
				</Typography>
			</CardContent>

			<CardActions>
				<MuiSkeleton height={52} width={100} />
			</CardActions>
		</Card>
	);
};

const SkeletonGroup: React.FC = () => (
	<>
		{[...new Array(3)].map(i => (
			<Skeleton key={i} />
		))}
	</>
);

export default SkeletonGroup;
