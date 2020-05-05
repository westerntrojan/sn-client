import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './style.scss';

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	color?: 'primary' | 'inherit' | 'secondary';
	fullWidth?: boolean;
	loading?: boolean;
	disabled?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	component?: string;
};

const ContainedButton: React.FC<Props> = ({
	children,
	color = 'primary',
	fullWidth = false,
	loading,
	disabled,
	...props
}) => {
	return (
		<Button
			className={'contained-button'}
			variant='contained'
			color={color}
			fullWidth={fullWidth}
			disabled={disabled || loading}
			style={{color: 'white'}}
			{...props}
		>
			{children}
			{loading && <CircularProgress size={24} className='loader' color={color} />}
		</Button>
	);
};

export default ContainedButton;
