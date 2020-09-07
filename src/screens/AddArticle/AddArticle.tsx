import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';

import {addArticle} from '@store/articles/actions';
import {RootState} from '@store/types';
import Form from './components/Form';
import {IArticleInputs} from './types';
import useRedirect from '@utils/hooks/useRedirect';

const AddArticle: React.FC = () => {
	const redirectTo = useRedirect();

	const authUser = useSelector((state: RootState) => state.auth.user, shallowEqual);
	const dispatch = useDispatch();

	const handleArticleFormSubmit = async (newArticle: IArticleInputs): Promise<any> => {
		const data: any = await dispatch(addArticle({...newArticle, user: authUser._id}));

		if (data.success) {
			redirectTo(`/article/${data.article.slug}`);
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
