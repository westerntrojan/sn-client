import React, {useState, useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useSnackbar} from 'notistack';

import {ICategory} from '@/store/types';
import EditCategoryModal from './EditCategoryModal';
import Context from '@/screens/Admin/tabs/Categories/context';
import Loader from '@/components/common/loaders/Loader';

type Props = {
	category: ICategory;
};

const CategoryItem: React.FC<Props> = ({category}) => {
	const [editModal, setEditModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const {handleRemoveCategory} = useContext(Context);

	const {enqueueSnackbar} = useSnackbar();

	const _handleRemove = async () => {
		setLoading(true);

		const data = await handleRemoveCategory(category._id);

		if (data.success) {
			enqueueSnackbar('Сategory removed successfully', {variant: 'success'});
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
	};

	return (
		<>
			<ListItem key={category._id} button onClick={() => setEditModal(true)} disabled={loading}>
				<ListItemText primary={category.title} />
				<ListItemSecondaryAction>
					{loading ? (
						<IconButton edge='end' disabled>
							<Loader size={25} disableMargin />
						</IconButton>
					) : (
						<IconButton edge='end' onClick={_handleRemove}>
							<DeleteIcon />
						</IconButton>
					)}
				</ListItemSecondaryAction>
			</ListItem>

			<EditCategoryModal
				open={editModal}
				category={category}
				closeModal={() => setEditModal(false)}
			/>
		</>
	);
};

export default CategoryItem;
