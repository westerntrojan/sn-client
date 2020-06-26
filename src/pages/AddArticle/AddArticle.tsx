import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';

import {addArticle} from '@store/articles/actions';
import {AppState} from '@store/types';
import Form from './components/Form';
import {IArticleInputs} from './types';
import {useRedirect} from '@utils/hooks';

const AddArticle: React.FC = () => {
	const redirectTo = useRedirect();

	const authUser = useSelector((state: AppState) => state.auth.user, shallowEqual);
	const dispatch = useDispatch();

	const handleArticleFormSubmit = async (newArticle: IArticleInputs): Promise<any> => {
		const {title, text, category, tags, image} = newArticle;

		const formData = new FormData();
		formData.append('title', title);
		formData.append('text', text);
		formData.append('category', category);
		formData.append('tags', JSON.stringify(tags));
		formData.append('userId', authUser._id);
		if (image) {
			formData.append('image', image);
		}

		const data: any = await dispatch(addArticle(formData));

		if (data.errors) {
			return data.errors[0];
		}

		redirectTo(`/article/${data.article.slug}`);
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
