import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo';
import {useSelector, shallowEqual} from 'react-redux';

import {IArticle, RootState} from '@store/types';
import SmallArticle from '@components/common/SmallArticle';
import Loader from '@components/common/loaders/Loader';

const GetUserFeed = loader('./gql/GetUserFeed.gql');

const useStyles = makeStyles({
	noInfo: {
		textAlign: 'center',
	},
});

const Feed: React.FC = () => {
	const classes = useStyles();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {loading, data} = useQuery<{userFeed: IArticle[]}>(GetUserFeed, {
		variables: {
			userId: auth.user._id,
		},
		fetchPolicy: 'cache-and-network',
	});

	return (
		<div className='auth-feed'>
			{loading && <Loader disableMargin />}

			{!loading && data && !data.userFeed.length && (
				<div className={classes.noInfo}>
					<Typography variant='h5'>No articles</Typography>
				</div>
			)}

			{!loading &&
				data &&
				data.userFeed.map(article => <SmallArticle key={article._id} article={article} />)}
		</div>
	);
};

export default Feed;
