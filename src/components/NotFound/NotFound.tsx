import React from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import './style.scss';

const NotFound: React.FC = () => {
	return (
		<section className='not-found'>
			<Helmet>
				<title>404 Not Found</title>
			</Helmet>

			<Paper className='paper'>
				<Typography variant='h1' className='message'>
					404 Not Found
				</Typography>
			</Paper>
		</section>
	);
};

export default NotFound;
