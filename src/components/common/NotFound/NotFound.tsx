import React, {useEffect, useRef} from 'react';
import {Helmet} from 'react-helmet';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import lottie from 'lottie-web';

import './NotFound.scss';

const NotFound: React.FC = () => {
	const animationRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (animationRef.current) {
			lottie.loadAnimation({
				container: animationRef.current,
				renderer: 'svg',
				loop: false,
				autoplay: true,
				path: '/lottie-animations/not-found.json',
			});
		}
	}, []);

	return (
		<section className='not-found'>
			<Helmet>
				<title>404 Not Found</title>
			</Helmet>

			<Paper className='paper'>
				{/* <Typography variant='h1' className='message'>
					404 Not Found
				</Typography> */}
				<div ref={animationRef} style={{width: '100%'}}></div>
			</Paper>
		</section>
	);
};

export default NotFound;
