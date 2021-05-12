import React from 'react';
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {Helmet} from 'react-helmet';
import {useInfiniteQuery} from 'react-query';
import Skeleton from '@material-ui/lab/Skeleton';
import BottomScrollListener from 'react-bottom-scroll-listener';

import './Tag.scss';
import SmallArticle from '@/components/common/SmallArticle';
import RightBar from '@/components/common/RightBar';
import About from './About';
import callApi from '@/utils/callApi';
import {IArticle} from '@/store/types';
import SmallArticleSkeleton from '@/components/common/SmallArticle/SmallArticleSkeleton';

type Page = {
	articles: IArticle[];
	skip: number;
};

const Tag: React.FC = () => {
	const {slug} = useParams<{slug: string}>();

	const {isLoading: loadingTags, data, hasNextPage, fetchNextPage} = useInfiniteQuery<Page>(
		`/articles/tag/${slug}`,
		async ({pageParam = 0}) => {
			return callApi.get(`/articles/tag/${slug}?skip=${pageParam}`);
		},
		{
			getNextPageParam: lastPage => (lastPage.skip !== 0 ? lastPage.skip : null),
		},
	);

	return (
		<section className='tag'>
			<Helmet>
				<title>
					{`#${slug}`} / {process.env.REACT_APP_TITLE}
				</title>
			</Helmet>

			<div className='articles'>
				<About tag={slug} />

				{loadingTags && <SmallArticleSkeleton />}

				{!loadingTags && !data?.pages[0].articles.length && (
					<div className='no-info'>
						<Typography variant='h5'>No articles</Typography>
					</div>
				)}

				{data?.pages.map(page =>
					page.articles.map(article => <SmallArticle key={article._id} article={article} />),
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

export default Tag;
