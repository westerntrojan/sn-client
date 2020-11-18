import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import DirectionsIcon from '@material-ui/icons/Directions';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

type Props = {
	value: number;
	onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
};

const BottomTabs: React.FC<Props> = ({value, onChange}) => {
	return (
		<BottomNavigation value={value} onChange={onChange} showLabels>
			<BottomNavigationAction label='Navigation' icon={<DirectionsIcon />} />
			<BottomNavigationAction label='Messages' icon={<PersonIcon />} />
			<BottomNavigationAction label='Groups' icon={<GroupIcon />} />
		</BottomNavigation>
	);
};

export default BottomTabs;
