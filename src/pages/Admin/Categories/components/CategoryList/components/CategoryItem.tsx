import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import {ICategory} from '@store/types';
import EditCategoryModal from './EditCategoryModal';

type Props = {
	category: ICategory;
	handleEditCategory: (category: ICategory) => void;
	handleRemoveCategory: (categoryId: string) => void;
};

const CategoryItem: React.FC<Props> = ({category, handleEditCategory, handleRemoveCategory}) => {
	const [editModal, setEditModal] = useState(false);

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
				handleSubmit={handleEditCategory}
				closeModal={(): void => setEditModal(false)}
			/>
		</>
	);
};

export default CategoryItem;
