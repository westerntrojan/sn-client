import React, {useEffect} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';

import './style.scss';
import {
	addCategory,
	editCategory,
	moveCategory,
	restoreCategory,
	removeCategory,
} from '@store/category/actions';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import {ICategoryInputs} from './types';
import {RootState, ICategory} from '@store/types';

const Categories: React.FC = () => {
	const allCategory = useSelector((state: RootState) => state.category.all, shallowEqual);
	const dispatch = useDispatch();

	const {enqueueSnackbar, closeSnackbar} = useSnackbar();

	useEffect(() => {
		return (): void => {
			dispatch(removeCategory());
		};
	}, [dispatch]);

	const handleAddCategory = async (category: ICategoryInputs): Promise<void> => {
		const data: any = await dispatch(addCategory(category));

		if (data.errors) {
			return data.errors[0];
		}
	};

	const handleEditCategory = async (category: ICategory): Promise<void> => {
		const data: any = await dispatch(editCategory(category));

		if (data.errors) {
			return data.errors[0];
		}
	};

	const handleRemoveCategory = async (categoryId: string): Promise<void> => {
		dispatch(moveCategory(categoryId));

		const key = enqueueSnackbar('Сategory deleted successfully', {
			variant: 'success',
			action: (
				<Button
					onClick={(): void => {
						dispatch(restoreCategory(categoryId));

						closeSnackbar(key);
					}}
				>
					Cancel
				</Button>
			),
		});
	};

	return (
		<div className='categories'>
			<CategoryList
				allCategory={allCategory}
				handleEditCategory={handleEditCategory}
				handleRemoveCategory={handleRemoveCategory}
			/>
			<CategoryForm handleSubmit={handleAddCategory} />
		</div>
	);
};

export default Categories;
