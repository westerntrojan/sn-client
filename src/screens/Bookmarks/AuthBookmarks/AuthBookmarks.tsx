import React from 'react';
import Typography from '@material-ui/core/Typography';
import {useSelector, shallowEqual} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo';

import SmallArticle from '@/components/common/SmallArticle';
import SmallArticleSkeleton from '@/components/common/SmallArticle/SmallArticleSkeleton';
import {RootState, IArticle} from '@/store/types';
import _ from 'lodash';

const GetUserBookmarks = loader('./gql/GetUserBookmarks.gql');

const useStyles = makeStyles({
	noInfo: {
		textAlign: 'center',
	},
});

const AuthBookmarks: React.FC = () => {
	const classes = useStyles();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {loading: loadingBookmarks, data: {userBookmarks} = {userBookmarks: []}} = useQuery<{
		userBookmarks: IArticle[];
	}>(GetUserBookmarks, {
		variables: {
			userId: auth.user._id,
		},
		fetchPolicy: 'cache-and-network',
	});

	return (
		<div className='auth-bookmarks'>
			{loadingBookmarks && _.isEmpty(userBookmarks) && <SmallArticleSkeleton />}

			{userBookmarks.map(article => (
				<SmallArticle key={article._id} article={article} />
			))}

			{!loadingBookmarks && _.isEmpty(userBookmarks) && (
				<div className={classes.noInfo}>
					<Typography variant='h5'>No articles</Typography>
				</div>
			)}
		</div>
	);
};

export default AuthBookmarks;
