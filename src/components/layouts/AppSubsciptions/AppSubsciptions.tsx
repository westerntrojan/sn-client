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
		if (onViewAdded.data) {
			const {_id} = onViewAdded.data.viewAdded;

			dispatch(addView(_id));
		}
	}, [onViewAdded.data]);

	useEffect(() => {
		if (onLikeAdded.data) {
			const {_id} = onLikeAdded.data.likeAdded;

			dispatch(addLike(_id));
		}
	}, [onLikeAdded.data]);

	useEffect(() => {
		if (onDislikeAdded.data) {
			const {_id} = onDislikeAdded.data.dislikeAdded;

			dispatch(addDislike(_id));
		}
	}, [onDislikeAdded.data]);

	return <div></div>;
};

export default AppSubscriptions;
