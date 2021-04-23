import React, {useState, useCallback, useEffect} from 'react';
import {useParams} from 'react-router';
import Typography from '@material-ui/core/Typography';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {useDispatch} from 'react-redux';
import {Helmet} from 'react-helmet';
import Skeleton from '@material-ui/lab/Skeleton';
import {useQuery} from 'react-query';

import './Category.scss';
import SmallArticle from '@/components/common/SmallArticle';
import SmallArticleSkeleton from '@/components/common/SmallArticle/SmallArticleSkeleton';
import RightBar from '@/components/common/RightBar';
import About from './About';
import callApi from '@/utils/callApi';
import {IArticle, ICategory} from '@/store/types';
import {notFound} from '@/store/app/actions';
import {IFetchData} from './types';

const Category: React.FC = () => {
	const {slug} = useParams<{slug: string}>();

	const [articles, setArticles] = useState<IArticle[]>([]);
	const [loading, setLoading] = useState(true);
	const [end, setEnd] = useState(false);

	const {isLoading: loadingCategory, data: category = {} as ICategory} = useQuery<ICategory>(
		`/categories/${slug}`,
		async () => {
			const {category} = await callApi.get(`/categories/${slug}`);

			return category;
		},
	);

	const dispatch = useDispatch();

	const loadMore = useCallback(async () => {
		if (category) {
			const skip = articles.length;

			const data: IFetchData = await callApi.get(
				`/categories/${category._id}/articles?skip=${skip}`,
			);

			if (data.articles.length < 10) {
				setEnd(true);
			}

			setArticles(articles.concat(data.articles));
		}
	}, [category, articles]);

	const getArticles = useCallback(async () => {
		if (category) {
			const data: IFetchData = await callApi.get(`/categories/${category._id}/articles?skip=0`);

			if (data.articles.length < 10) {
				setEnd(true);
			}

			setArticles(data.articles);

			setLoading(false);
		} else {
			dispatch(notFound());
		}
	}, [dispatch, category]);

	useEffect(() => {
		if (!loadingCategory) {
			getArticles();
		}
	}, [getArticles, loadingCategory]);

	return (
		<section className='category'>
			{!loadingCategory && (
				<Helmet>
					<title>
						{category.title} / {process.env.REACT_APP_TITLE}
					</title>
				</Helmet>
			)}

			<div className='articles'>
				{!loadingCategory && <About category={category} />}

				{loading && <SmallArticleSkeleton />}

				{!loading && !articles.length && (
					<div className='no-info'>
						<Typography variant='h5'>No articles</Typography>
					</div>
				)}

				{!loading && articles.map(article => <SmallArticle key={article._id} article={article} />)}

				{Boolean(articles.length) && !end && (
					<div className='more-loader'>
						<Skeleton width={200} height={40} />

						<BottomScrollListener onBottom={loadMore} />
					</div>
				)}
			</div>

			<RightBar />
		</section>
	);
};

export default Category;
