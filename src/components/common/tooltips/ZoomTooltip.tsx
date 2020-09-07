import React from 'react';
import Tooltip, {TooltipProps} from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

interface IProps extends TooltipProps {
	children: JSX.Element;
}

const ZoomTooltip: React.FC<IProps> = ({children, ...props}) => {
	return (
		<Tooltip TransitionComponent={Zoom} {...props}>
			{children}
		</Tooltip>
	);
};

export default ZoomTooltip;
