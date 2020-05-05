import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

type Props = {
	color?: 'primary' | 'inherit' | 'secondary';
	fullWidth?: boolean;
	disabled?: boolean;
	onClick: () => void;
};

const SubscribeButton: React.FC<Props> = ({
	color = 'primary',
	fullWidth = false,
	disabled = false,
	...props
}) => {
	return (
		<Button
			variant='contained'
			color={color}
			fullWidth={fullWidth}
			disabled={disabled}
			startIcon={<AddIcon />}
			style={{color: 'white'}}
			{...props}
		>
			subscribe
		</Button>
	);
};

export default SubscribeButton;
