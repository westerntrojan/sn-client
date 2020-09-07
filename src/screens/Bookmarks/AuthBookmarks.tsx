import React from 'react';
import Typography from '@material-ui/core/Typography';
import {useSelector, shallowEqual} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo';

import Loader from '@components/common/loaders/Loader';
import SmallArticle from '@components/common/SmallArticle';
import {RootState, IArticle} from '@store/types';

const GetUserBookmarks = loader('./gql/GetUserBookmarks.gql');

const useStyles = makeStyles({
	noInfo: {
		textAlign: 'center',
	},
});

const AuthBookmarks: React.FC = () => {
	const classes = useStyles();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {loading, data} = useQuery<{userBookmarks: IArticle[]}>(GetUserBookmarks, {
		variables: {
			userId: auth.user._id,
		},
		fetchPolicy: 'cache-and-network',
	});

	return (
		<div className='auth-bookmarks'>
			{loading && <Loader disableMargin />}

			{!loading && data && !data.userBookmarks.length && (
				<div className={classes.noInfo}>
					<Typography variant='h5'>No articles</Typography>
				</div>
			)}

			{!loading &&
				data &&
				data.userBookmarks.map(article => <SmallArticle key={article._id} article={article} />)}
		</div>
	);
};

export default AuthBookmarks;
