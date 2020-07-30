import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {useSelector, shallowEqual} from 'react-redux';
import {makeStyles} from '@material-ui/styles';

import Loader from '@components/loaders/Loader';
import callApi from '@utils/callApi';
import SmallArticle from '@components/SmallArticle';
import {RootState, IArticle} from '@store/types';

const useStyles = makeStyles({
	noInfo: {
		textAlign: 'center',
	},
});

const AuthBookmarks: React.FC = () => {
	const classes = useStyles();

	const [articles, setArticles] = useState<IArticle[]>([]);
	const [loading, setLoading] = useState(true);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	useEffect(() => {
		const fetchArticles = async (): Promise<void> => {
			const data = await callApi.get(`/articles/bookmarks/${auth.user._id}`);

			setArticles(data.articles);
			setLoading(false);
		};
		fetchArticles();
	}, [auth.user._id]);

	return (
		<div className='auth-bookmarks'>
			{loading && <Loader disableMargin />}

			{!loading && !articles.length && (
				<div className={classes.noInfo}>
					<Typography variant='h5'>No articles</Typography>
				</div>
			)}

			{!loading && articles.map(article => <SmallArticle key={article._id} article={article} />)}
		</div>
	);
};

export default AuthBookmarks;
