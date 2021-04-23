import React from 'react';

import {useParams, useHistory} from 'react-router';
import {Helmet} from 'react-helmet';
import {useQuery, useMutation} from 'react-query';

import Loader from '@/components/common/loaders/Loader';
import Form from './Form';
import {IArticleInputs} from './types';
import {IArticle} from '@/store/types';
import callApi from '@/utils/callApi';

const EditArticle: React.FC = () => {
	const {slug} = useParams<{slug: string}>();
	const history = useHistory();

	const {isLoading: loadingArticle, data: article = {} as IArticle} = useQuery<IArticle>(
		`/articles/${slug}`,
		async () => {
			const {article} = await callApi.get(`/articles/${slug}`);

			return article;
		},
	);

	const {mutateAsync: editArticle} = useMutation(
		(inputs: IArticleInputs) => callApi.put(`/articles/${article._id}`, {...article, ...inputs}),
		{
			onSuccess(data) {
				if (data.success) {
					history.push(`/article/${data.article.slug}`);
				}
			},
		},
	);

	return (
		<section className='edit-article'>
			<Helmet>
				<title>Edit article / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{loadingArticle ? <Loader /> : <Form article={article} handleSubmit={editArticle} />}
		</section>
	);
};

export default EditArticle;
