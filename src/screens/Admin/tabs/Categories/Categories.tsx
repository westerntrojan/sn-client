import React from 'react';
import {useQuery, useMutation} from 'react-query';

import './Categories.scss';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import {ICategoryInputs} from './types';
import {ICategory} from '@/store/types';
import Context from './context';
import callApi from '@/utils/callApi';
import {updateCache} from '@/queryClient';

const Categories: React.FC = () => {
	const {isLoading: loadingCategories, data: categories = []} = useQuery<ICategory[]>(
		'/categories',
		async () => {
			const {categories} = await callApi.get('/categories');

			return categories;
		},
	);

	const {mutateAsync: addCategory} = useMutation(
		(category: ICategoryInputs) => callApi.post('/categories', category),
		{
			onSuccess(data) {
				if (data.success) {
					updateCache<ICategory[]>('/categories', categories => categories.concat(data.category));
				}
			},
		},
	);
	const {mutateAsync: editCategory} = useMutation(
		(category: ICategory) => callApi.put(`/categories/${category._id}`, category),
		{
			onSuccess(data) {
				if (data.success) {
					updateCache<ICategory[]>('/categories', categories => {
						return categories.map(category => {
							if (category._id === data.category._id) {
								return data.category;
							}

							return category;
						});
					});
				}
			},
		},
	);
	const {mutateAsync: removeCategory} = useMutation(
		(categoryId: string) => callApi.delete(`/categories/${categoryId}`),
		{
			onSuccess(data) {
				if (data.success) {
					updateCache<ICategory[]>('/categories', categories =>
						categories.filter(category => category._id !== data.categoryId),
					);
				}
			},
		},
	);

	return (
		<div className='/categories'>
			<Context.Provider
				value={{
					handleEditCategory: editCategory,
					handleRemoveCategory: removeCategory,
				}}
			>
				<CategoryList loading={loadingCategories} categories={categories} />

				<CategoryForm handleAddCategory={addCategory} />
			</Context.Provider>
		</div>
	);
};

export default Categories;
