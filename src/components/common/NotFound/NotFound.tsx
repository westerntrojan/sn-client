import React from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';

import './NotFound.scss';

const NotFound: React.FC = () => {
	return (
		<section className='not-found'>
			<Helmet>
				<title>404 Not Found</title>
			</Helmet>

			<Typography variant='h1'>404 Not Found</Typography>
		</section>
	);
};

export default NotFound;
