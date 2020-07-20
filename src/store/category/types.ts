import {ICategory} from '@store/types';

export const GET_CATEGORIES = 'category/getAll';
export const ADD_CATEGORY = 'category/add';
export const EDIT_CATEGORY = 'category/edit';
export const MOVE_CATEGORY = 'category/move';
export const RESTORE_CATEGORY = 'category/restore';
export const REMOVE_CATEGORY = 'category/remove';

export type CategoryState = {
	all: ICategory[];
	removedCategories: ICategory[];
};
