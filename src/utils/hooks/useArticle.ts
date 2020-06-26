import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

import {AppState, IArticle} from '@store/types';
import {getArticle} from '@store/articles/actions';

type ReturningData = [IArticle | null, (slug: string) => void];

export default (): ReturningData => {
	const [article, setArticle] = useState<IArticle | null>(null);
	const [slug, setSlug] = useState('');

	const dispatch = useDispatch();

	const mainArticle = useSelector(
		(state: AppState) => state.articles.all.find(a => a.slug === slug),
		shallowEqual,
	);
	const cacheArticle = useSelector(
		(state: AppState) => state.articles.cache.find(a => a.slug === slug),
		shallowEqual,
	);

	const setArticleSlug = (slug: string): void => {
		setSlug(slug);
	};

	const findArticle = useCallback(() => {
		if (slug) {
			if (mainArticle) {
				setArticle(mainArticle);
			} else if (cacheArticle) {
				setArticle(cacheArticle);
			} else {
				if (!article) {
					dispatch(getArticle(slug));
				}
			}
		}
	}, [slug, mainArticle, cacheArticle, dispatch, article]);

	useEffect(() => {
		findArticle();
	}, [findArticle]);

	return [article, setArticleSlug];
};
