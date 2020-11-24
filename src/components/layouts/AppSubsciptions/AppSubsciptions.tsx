import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loader} from 'graphql.macro';
import {useSubscription} from 'react-apollo';

import {addView, addLike, addDislike} from '@store/articles/actions';

const OnViewAdded = loader('./gql/OnViewAdded.gql');
const OnLikeAdded = loader('./gql/OnLikeAdded.gql');
const OnDislikeAdded = loader('./gql/OnDislikeAdded.gql');

const AppSubscriptions: React.FC = () => {
	const dispatch = useDispatch();

	const onViewAdded = useSubscription(OnViewAdded);
	const onLikeAdded = useSubscription(OnLikeAdded);
	const onDislikeAdded = useSubscription(OnDislikeAdded);

	useEffect(() => {
		if (!onViewAdded.loading) {
			const {_id} = onViewAdded.data.viewAdded;

			dispatch(addView(_id));
		}

		// eslint-disable-next-line
	}, [onViewAdded.loading, onViewAdded.data]);

	useEffect(() => {
		if (!onLikeAdded.loading) {
			const {_id} = onLikeAdded.data.likeAdded;

			dispatch(addLike(_id));
		}

		// eslint-disable-next-line
	}, [onLikeAdded.loading, onLikeAdded.data]);

	useEffect(() => {
		if (!onDislikeAdded.loading) {
			const {_id} = onDislikeAdded.data.dislikeAdded;

			dispatch(addDislike(_id));
		}

		// eslint-disable-next-line
	}, [onDislikeAdded.loading, onDislikeAdded.data]);

	return <div></div>;
};

export default AppSubscriptions;
