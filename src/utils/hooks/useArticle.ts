import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState, IArticle} from '@store/types';
import {articleSelector, cacheSelector} from '@selectors/articles';
import {getArticle} from '@store/articles/actions';

type ReturningData = [IArticle | null, (slug: string) => void];

export default (): ReturningData => {
	const [article, setArticle] = useState<IArticle | null>(null);
	const [slug, setSlug] = useState('');

	const dispatch = useDispatch();

	const mainArticle = useSelector((state: RootState) => articleSelector(state, String(slug)));
	const cacheArticle = useSelector((state: RootState) => cacheSelector(state, String(slug)));

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
