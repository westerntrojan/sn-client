import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loader} from 'graphql.macro';
import {useSubscription} from 'react-apollo';

import {addLike, addDislike, addViews} from '@store/articles/actions';

const LikesSubscription = loader('./gql/LikesSubscription.gql');
const DislikesSubscription = loader('./gql/DislikesSubscription.gql');
const ViewsSubscription = loader('./gql/ViewsSubscription.gql');

const AppSubscriptions: React.FC = () => {
	const dispatch = useDispatch();

	const onLikesAdded = useSubscription(LikesSubscription);
	const onDislikesAdded = useSubscription(DislikesSubscription);
	const onViewsAdded = useSubscription(ViewsSubscription);

	useEffect(() => {
		if (!onLikesAdded.loading) {
			const {_id} = onLikesAdded.data.likesAdded;

			dispatch(addLike(_id));
		}
	}, [onLikesAdded.loading, onLikesAdded.data, dispatch]);

	useEffect(() => {
		if (!onDislikesAdded.loading) {
			const {_id} = onDislikesAdded.data.dislikesAdded;

			dispatch(addDislike(_id));
		}
	}, [onDislikesAdded.loading, onDislikesAdded.data, dispatch]);

	useEffect(() => {
		if (!onViewsAdded.loading) {
			const {_id} = onViewsAdded.data.viewsAdded;

			dispatch(addViews(_id));
		}
	}, [onViewsAdded.loading, onViewsAdded.data, dispatch]);

	return <div></div>;
};

export default AppSubscriptions;
