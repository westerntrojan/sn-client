import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import {useHistory} from 'react-router';

import {addArticle} from '@store/articles/actions';
import {RootState} from '@store/types';
import Form from './Form';
import {IArticleInputs} from './types';

const AddArticle: React.FC = () => {
	const history = useHistory();

	const authUser = useSelector((state: RootState) => state.auth.user, shallowEqual);
	const dispatch = useDispatch();

	const handleArticleFormSubmit = async (newArticle: IArticleInputs): Promise<any> => {
		const data: any = await dispatch(addArticle({...newArticle, user: authUser._id}));

		if (data.success) {
			history.push(`/article/${data.article.slug}`);
		}

		return data;
	};

	return (
		<section className='add-article'>
			<Helmet>
				<title>Add article / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Form handleSubmit={handleArticleFormSubmit} />
		</section>
	);
};

export default AddArticle;
