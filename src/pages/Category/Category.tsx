import React, {useState, useCallback, useEffect} from 'react';
import {useParams} from 'react-router';
import Typography from '@material-ui/core/Typography';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {useDispatch, useSelector} from 'react-redux';
import {Helmet} from 'react-helmet';

import './style.scss';
import Loader from '@components/Loader';
import SmallArticle from '@components/SmallArticle';
import RightBar from '@components/RightBar';
import About from './components/About';
import callApi from '@utils/callApi';
import {IArticle} from '@store/types';
import {notFound} from '@store/app/actions';
import {IFetchData} from './types';
import {RootState} from '@store/types';
import {categorySelector} from '@selectors/category';

const Category: React.FC = () => {
	const {slug} = useParams();

	const [articles, setArticles] = useState<IArticle[]>([]);
	const [loading, setLoading] = useState(true);
	const [end, setEnd] = useState(false);

	const category = useSelector((state: RootState) => categorySelector(state, String(slug)));
	const dispatch = useDispatch();

	const loadMore = useCallback(async () => {
		if (category) {
			const skip = articles.length;

			const data: IFetchData = await callApi.get(`/category/${category._id}/articles?skip=${skip}`);

			if (data.articles.length < 10) {
				setEnd(true);
			}

			setArticles(articles.concat(data.articles));
		}
	}, [category, articles]);

	const getArticles = useCallback(async () => {
		if (category) {
			const data: IFetchData = await callApi.get(`/category/${category._id}/articles?skip=0`);

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
		if (loading) {
			getArticles();
		}
	}, [getArticles, loading]);

	return (
		<section className='category'>
			{category && (
				<Helmet>
					<title>
						{category.title} / {process.env.REACT_APP_TITLE}
					</title>
				</Helmet>
			)}

			<div className='articles'>
				{loading && <Loader />}

				{category && <About category={category} />}

				{!loading && !articles.length && (
					<div className='no-info'>
						<Typography variant='h5'>No articles</Typography>
					</div>
				)}

				{!loading && articles.map(article => <SmallArticle key={article._id} article={article} />)}

				{Boolean(articles.length) && !end && (
					<>
						<Loader />
						<BottomScrollListener onBottom={loadMore} />
					</>
				)}
			</div>

			<RightBar />
		</section>
	);
};

export default Category;
