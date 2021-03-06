import React from 'react';
import LinearProgress, {LinearProgressProps} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface Props extends LinearProgressProps {
	value: number;
}

const LinearProgressWithLabel: React.FC<Props> = ({value, ...props}) => {
	return (
		<Box width='100%' display='flex' alignItems='center' {...props}>
			<Box width='100%' mr={1}>
				<LinearProgress variant='determinate' value={value} />
			</Box>

			<Box minWidth={35}>
				<Typography variant='body2' color='textSecondary'>{`${Math.round(value)}%`}</Typography>
			</Box>
		</Box>
	);
};

// const useStyles = makeStyles({
// 	root: {
// 		width: '100%',
// 	},
// });

// const LinearWithValueLabel: React.FC = () => {
// 	const classes = useStyles();
// 	const [progress, setProgress] = React.useState(10);

// 	React.useEffect(() => {
// 		const timer = setInterval(() => {
// 			setProgress(prevProgress => (prevProgress >= 100 ? 10 : prevProgress + 10));
// 		}, 800);
// 		return () => {
// 			clearInterval(timer);
// 		};
// 	}, []);

// 	return (
// 		<div className={classes.root}>
// 			<LinearProgressWithLabel value={progress} />
// 		</div>
// 	);
// };

export default LinearProgressWithLabel;
