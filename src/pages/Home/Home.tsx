import React from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch} from 'react-redux';
import {useSelector, shallowEqual} from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Typography from '@material-ui/core/Typography';

import './style.scss';
import Loader from '@components/Loader';
import SmallArticle from '@components/SmallArticle';
import RightBar from '@components/RightBar';
import {fetchArticles} from '@store/articles/actions';
import {AppState} from '@store/types';
import {IArticle} from '@store/types';

const Home: React.FC = () => {
	const articles = useSelector((state: AppState) => state.articles, shallowEqual);
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
				{!articles.all.length && (
					<div className='no-info'>
						<Typography variant='h5'>No articles</Typography>
					</div>
				)}

				{articles.all.map((article: IArticle) => (
					<SmallArticle article={article} key={article._id} />
				))}

				{!articles.end && (
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
