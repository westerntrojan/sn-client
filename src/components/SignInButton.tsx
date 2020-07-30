import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useLocation} from 'react-router';

type Props = {
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
};

const SignInButton: React.FC<Props> = ({
	marginTop = 0,
	marginRight = 0,
	marginBottom = 0,
	marginLeft = 0,
}) => {
	const location = useLocation();

	return (
		<Link
			underline='none'
			component={RouterLink}
			to={{pathname: '/auth', state: {from: location}}}
			color={'inherit'}
		>
			<Button
				variant='outlined'
				startIcon={<AccountCircleIcon />}
				color='inherit'
				style={{
					marginTop,
					marginRight,
					marginBottom,
					marginLeft,
				}}
			>
				Sign in
			</Button>
		</Link>
	);
};

export default SignInButton;
