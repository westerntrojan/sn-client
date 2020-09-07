import React from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch} from 'react-redux';
import {useSelector, shallowEqual} from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Typography from '@material-ui/core/Typography';

import './Home.scss';
import Loader from '@components/common/loaders/Loader';
import SmallArticle from '@components/common/SmallArticle';
import RightBar from '@components/common/RightBar';
import {fetchArticles} from '@store/articles/actions';
import {RootState} from '@store/types';
import {IArticle} from '@store/types';

const Home: React.FC = () => {
	const appLoading = useSelector((state: RootState) => state.app.loading, shallowEqual);
	const articles = useSelector((state: RootState) => state.articles, shallowEqual);
	const dispatch = useDispatch();

	const loadMore = (): void => {
		dispatch(fetchArticles());
	};

	return (
		<section className='home'>
			<Helmet>
				<title>Home / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<div className='articles'>
				{appLoading && <Loader disableMargin />}

				{!appLoading && !articles.all.length && (
					<div className='no-info'>
						<Typography variant='h5'>No articles</Typography>
					</div>
				)}

				{!appLoading &&
					articles.all.map((article: IArticle) => (
						<SmallArticle article={article} key={article._id} />
					))}

				{!appLoading && !articles.end && (
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

export default Home;
