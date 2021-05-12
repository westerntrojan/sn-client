import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import {useHistory} from 'react-router-dom';
import {useMutation} from 'react-query';

import {RootState} from '@/store/types';
import Form from './Form';
import {IArticleInputs} from './types';
import callApi from '@/utils/callApi';

const AddArticle: React.FC = () => {
	const history = useHistory();

	const authUser = useSelector((state: RootState) => state.auth.user, shallowEqual);

	const {mutateAsync: addArticle} = useMutation(
		(inputs: IArticleInputs) => callApi.post('/articles', {...inputs, user: authUser._id}),
		{
			onSuccess(data) {
				if (data.success) {
					history.push(`/article/${data.article.slug}`);
				}
			},
		},
	);

	return (
		<section className='add-article'>
			<Helmet>
				<title>Add article / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Form handleSubmit={addArticle} />
		</section>
	);
};

export default AddArticle;
