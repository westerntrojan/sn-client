import React from 'react';
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
	open: boolean;
	position: {top: number; left: number};
	handleClearSelected: () => void;
	handleRemoveSelected: () => void;
	closeMenu: () => void;
};

const SelectedMessageMenu: React.FC<Props> = ({
	open,
	position,
	handleClearSelected,
	handleRemoveSelected,
	closeMenu,
}) => {
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
						handleClearSelected();

						closeMenu();
					}}
				>
					<ListItemIcon>
						<ClearAllIcon />
					</ListItemIcon>
					<ListItemText primary={'Clear selected'} />
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleRemoveSelected();

						closeMenu();
					}}
				>
					<ListItemIcon>
						<DeleteIcon />
					</ListItemIcon>
					<ListItemText primary={'Remove selected'} />
				</MenuItem>
			</MenuList>
		</Popover>
	);
};

export default SelectedMessageMenu;
