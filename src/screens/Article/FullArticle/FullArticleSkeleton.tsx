import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const FullArticleSkeleton = () => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Skeleton variant='circle'>
						<Avatar />
					</Skeleton>
				}
				title={
					<Typography variant='body2'>
						<Skeleton width={90} />
					</Typography>
				}
				subheader={<Skeleton width={60} />}
			/>

			<Skeleton variant='rect' height={440} />

			<CardContent>
				<Typography variant='h5'>
					<Skeleton />
				</Typography>
				<Typography variant='h5' style={{marginBottom: 20}}>
					<Skeleton width='40%' />
				</Typography>

				<Typography>
					<Skeleton />
				</Typography>
				<Typography>
					<Skeleton width='80%' />
				</Typography>
				<Typography>
					<Skeleton width='70%' />
				</Typography>
				<Typography>
					<Skeleton width='60%' />
				</Typography>
				<Typography>
					<Skeleton width='50%' />
				</Typography>
				<Typography style={{marginBottom: 20}}>
					<Skeleton width='40%' />
				</Typography>

				<Typography style={{marginBottom: 15}}>
					<Skeleton width={140} />
				</Typography>

				<div style={{display: 'flex'}}>
					<Skeleton width={85} height={52} style={{marginRight: 10}} />
					<Skeleton width={85} height={52} style={{marginRight: 10}} />
					<Skeleton width={85} height={52} />
				</div>
			</CardContent>

			<CardActions>
				<Skeleton variant='circle' width={40} height={40} />
				<Skeleton
					variant='circle'
					width={40}
					height={40}
					style={{marginRight: 40, transform: 'none !important'}}
				/>
				<Skeleton variant='circle' width={40} height={40} />
			</CardActions>
		</Card>
	);
};

export default FullArticleSkeleton;
