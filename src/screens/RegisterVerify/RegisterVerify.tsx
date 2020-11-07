import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import Typography from '@material-ui/core/Typography';
import {Helmet} from 'react-helmet';

import './RegisterVerify.scss';
import Loader from '@components/common/loaders/Loader';
import callApi from '@utils/callApi';

const RegisterVerfiy: React.FC = () => {
	const [verified, setVerified] = useState(false);
	const [loading, setLoading] = useState(true);

	const {token} = useParams();

	useEffect(() => {
		const validateToken = async (): Promise<void> => {
			const data = await callApi.get(`/auth/register/verify?token=${token}`);

			if (data.success) {
				setVerified(true);
			}

			setLoading(false);
		};
		validateToken();
	}, [token]);

	if (loading) {
		return <Loader />;
	}

	return (
		<section className='register-verify'>
			<Helmet>
				<title>Register verify / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{verified ? (
				<Typography variant='h2'>Success ! You can now log in</Typography>
			) : (
				<Typography variant='h2'>Something went wrong. Try reloading the page</Typography>
			)}
		</section>
	);
};

export default RegisterVerfiy;
