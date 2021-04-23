import React from 'react';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {useAuthModal} from '@/utils/hooks';

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
	const {openAuthModal} = useAuthModal();

	return (
		<Button
			variant='outlined'
			startIcon={<AccountCircleIcon />}
			color='inherit'
			onClick={openAuthModal}
			style={{
				marginTop,
				marginRight,
				marginBottom,
				marginLeft,
			}}
		>
			Sign in
		</Button>
	);
};

export default SignInButton;
