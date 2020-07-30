import React, {useState} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import {ZoomTooltip} from '@components/tooltips';

const BottomTabs: React.FC = () => {
	const [value, setValue] = useState(0);

	return (
		<ZoomTooltip title="Haven't come up with yet ;)">
			<BottomNavigation
				value={value}
				onChange={(event, newValue): void => {
					setValue(newValue);
				}}
				showLabels
			>
				<BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
				<BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
				<BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
			</BottomNavigation>
		</ZoomTooltip>
	);
};

export default BottomTabs;
