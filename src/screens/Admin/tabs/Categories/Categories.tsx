import React, {useEffect} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';

import './Categories.scss';
import {
	addCategory,
	editCategory,
	moveCategory,
	restoreCategory,
	removeCategory,
} from '@store/category/actions';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import {ICategoryInputs} from './types';
import {RootState, ICategory} from '@store/types';
import Context from './context';

const Categories: React.FC = () => {
	const allCategory = useSelector((state: RootState) => state.category.all, shallowEqual);
	const dispatch = useDispatch();

	const {enqueueSnackbar, closeSnackbar} = useSnackbar();

	useEffect(() => {
		return () => {
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

		return data;
	};

	const handleRemoveCategory = async (categoryId: string): Promise<void> => {
		dispatch(moveCategory(categoryId));

		const key = enqueueSnackbar('Сategory removed successfully', {
			action: (
				<Button
					onClick={() => {
						dispatch(restoreCategory(categoryId));

						closeSnackbar(key);
					}}
					color='primary'
				>
					Cancel
				</Button>
			),
		});
	};

	return (
		<div className='categories'>
			<Context.Provider value={{handleAddCategory, handleEditCategory, handleRemoveCategory}}>
				<CategoryList allCategory={allCategory} />

				<CategoryForm handleAddCategory={handleAddCategory} />
			</Context.Provider>
		</div>
	);
};

export default Categories;
