import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '@store/types';

type Category = {
	slug: string;
};

export const categorySelector = createSelector(
	(state: RootState) => state.category.all,
	(_: object, slug: string) => slug,
	(all, slug) => all.find((category: Category) => category.slug === slug),
);
