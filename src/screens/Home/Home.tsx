import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Skeleton from '@material-ui/lab/Skeleton';
import {useInfiniteQuery} from 'react-query';
import {loader} from 'graphql.macro';
import {useSubscription} from 'react-apollo';

import './Home.scss';
import SmallArticle from '@/components/common/SmallArticle';
import RightBar from '@/components/common/RightBar';
import {IArticle} from '@/store/types';
import callApi from '@/utils/callApi';
import {updateCache} from '@/queryClient';
import SmallArticleSkeleton from '@/components/common/SmallArticle/SmallArticleSkeleton';

const OnViewAdded = loader('./gql/OnViewAdded.gql');

type Page = {
	articles: IArticle[];
	skip: number;
};

const Home: React.FC = () => {
	const {isLoading: loadingArticles, data, hasNextPage, fetchNextPage} = useInfiniteQuery<Page>(
		'articles',
		async ({pageParam = 0}) => {
			return callApi.get(`/articles?skip=${pageParam}`);
		},
		{
			getNextPageParam: lastPage => (lastPage.skip !== 0 ? lastPage.skip : null),
		},
	);

	const onViewAdded = useSubscription(OnViewAdded);

	useEffect(() => {
		if (onViewAdded.data) {
			const {_id} = onViewAdded.data.viewAdded;

			updateCache<{pages: {articles: IArticle[]}[]}>('/articles', data => {
				const pages = data.pages.map(page => {
					const articles = page.articles.map(article => {
						if (article._id === _id) {
							article.views = article.views + 1;
						}

						return article;
					});

					return {articles};
				});

				return {pages};
			});
		}
	}, [onViewAdded.data]);

	return (
		<section className='home'>
			<Helmet>
				<title>Home / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<div className='articles'>
				{loadingArticles && <SmallArticleSkeleton />}

				{!loadingArticles && !data?.pages[0].articles.length && (
					<div className='no-info'>
						<Typography variant='h5'>No articles</Typography>
					</div>
				)}

				{data?.pages.map(page =>
					page.articles.map(article => <SmallArticle article={article} key={article._id} />),
				)}

				{hasNextPage && (
					<div className='more-loader'>
						<Skeleton width={200} height={40} />

						<BottomScrollListener onBottom={fetchNextPage} />
					</div>
				)}
			</div>

			<RightBar />
		</section>
	);
};

export default Home;
