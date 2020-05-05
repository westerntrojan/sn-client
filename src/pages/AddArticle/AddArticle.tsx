import React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useHistory} from 'react-router';
import {Helmet} from 'react-helmet';

import {addArticle} from '@store/articles/actions';
import {RootState} from '@store/types';
import Form from './components/Form';
import {IArticleInputs} from './types';

const AddArticle: React.FC = () => {
	const history = useHistory();

	const authUser = useSelector((state: RootState) => state.auth.user, shallowEqual);
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

		history.push(`/article/${data.article.slug}`);
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
