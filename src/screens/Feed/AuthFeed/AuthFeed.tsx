import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo';
import {useSelector, shallowEqual} from 'react-redux';
import _ from 'lodash';

import {IArticle, RootState} from '@/store/types';
import SmallArticle from '@/components/common/SmallArticle';
import SmallArticleSkeleton from '@/components/common/SmallArticle/SmallArticleSkeleton';

const GetUserFeed = loader('./gql/GetUserFeed.gql');

const useStyles = makeStyles({
	noInfo: {
		textAlign: 'center',
	},
});

const Feed: React.FC = () => {
	const classes = useStyles();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {loading: loadingFeed, data: {userFeed} = {userFeed: []}} = useQuery<{
		userFeed: IArticle[];
	}>(GetUserFeed, {
		variables: {
			userId: auth.user._id,
		},
		fetchPolicy: 'cache-and-network',
	});

	return (
		<div className='auth-feed'>
			{loadingFeed && _.isEmpty(userFeed) && <SmallArticleSkeleton />}

			{userFeed.map(article => (
				<SmallArticle key={article._id} article={article} />
			))}

			{!loadingFeed && _.isEmpty(userFeed) && (
				<div className={classes.noInfo}>
					<Typography variant='h5'>No articles</Typography>
				</div>
			)}
		</div>
	);
};

export default Feed;
