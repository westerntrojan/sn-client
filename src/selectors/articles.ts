import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '@store/types';

type Article = {
	slug: string;
};

export const articleSelector = createSelector(
	(state: RootState) => state.articles.all,
	(_: object, slug: string) => slug,
	(all, slug) => all.find((article: Article) => article.slug === slug),
);

export const cacheSelector = createSelector(
	(state: RootState) => state.articles.cache,
	(_: object, slug: string) => slug,
	(cache, slug) => cache.find((article: Article) => article.slug === slug),
);
