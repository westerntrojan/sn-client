import React from 'react';
import CircularProgress, {CircularProgressProps} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface Props extends CircularProgressProps {
	value: number;
}

const CircularProgressWithLabel: React.FC<Props> = props => {
	return (
		<Box position='relative' display='inline-flex'>
			<CircularProgress variant='static' {...props} />

			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position='absolute'
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				<Typography variant='caption' component='div' color='textSecondary'>{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

// const CircularStatic: React.FC = () => {
// 	const [progress, setProgress] = React.useState(10);

// 	React.useEffect(() => {
// 		const timer = setInterval(() => {
// 			setProgress(prevProgress => (prevProgress >= 100 ? 10 : prevProgress + 10));
// 		}, 800);

// 		return (): void => {
// 			clearInterval(timer);
// 		};
// 	}, []);

// 	return <CircularProgressWithLabel value={progress} />;
// };

export default CircularProgressWithLabel;
