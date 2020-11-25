import React, {useState, useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import {ICategory} from '@store/types';
import EditCategoryModal from './EditCategoryModal';
import Context from '@screens/Admin/tabs/Categories/context';

type Props = {
	category: ICategory;
};

const CategoryItem: React.FC<Props> = ({category}) => {
	const [editModal, setEditModal] = useState(false);

	const {handleRemoveCategory} = useContext(Context);

	return (
		<>
			<ListItem key={category._id} button onClick={(): void => setEditModal(true)}>
				<ListItemText primary={category.title} />
				<ListItemSecondaryAction>
					<IconButton edge='end' onClick={(): void => handleRemoveCategory(category._id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>

			<EditCategoryModal
				open={editModal}
				category={category}
				closeModal={(): void => setEditModal(false)}
			/>
		</>
	);
};

export default CategoryItem;
