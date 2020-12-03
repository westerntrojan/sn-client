import React from 'react';
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

type Props = {
	open: boolean;
	position: {top: number; left: number};
	handleSelect: () => void;
	closeMenu: () => void;
};

const WithSelectedMessageMenu: React.FC<Props> = ({open, position, handleSelect, closeMenu}) => {
	return (
		<Popover
			open={open}
			onClose={closeMenu}
			anchorReference='anchorPosition'
			anchorPosition={position}
			onClick={(e: React.MouseEvent) => e.stopPropagation()}
		>
			<MenuList onClick={(e: React.MouseEvent) => e.stopPropagation()}>
				<MenuItem
					onClick={() => {
						handleSelect();

						closeMenu();
					}}
				>
					<ListItemIcon>
						<CheckBoxIcon />
					</ListItemIcon>
					<ListItemText primary={'Select'} />
				</MenuItem>
			</MenuList>
		</Popover>
	);
};

export default WithSelectedMessageMenu;
