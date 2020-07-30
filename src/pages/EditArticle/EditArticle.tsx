import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useParams} from 'react-router';
import {Helmet} from 'react-helmet';

import Loader from '@components/loaders/Loader';
import Form from './components/Form';
import {editArticle} from '@store/articles/actions';
import {RootState} from '@store/types';
import {IArticleInputs} from './types';
import {useArticle, useRedirect} from '@utils/hooks';

const EditArticle: React.FC = () => {
	const {slug} = useParams();

	const [article, setArticleSlug] = useArticle();
	const redirectTo = useRedirect();

	const authUser = useSelector((state: RootState) => state.auth.user, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		if (slug) {
			setArticleSlug(slug);
		}
	}, [slug, setArticleSlug]);

	const handleArticleFormSubmit = async (newArticle: IArticleInputs): Promise<any> => {
		if (article) {
			const {title, text, category, tags, imageFile, imagePreview} = newArticle;

			const formData = new FormData();
			formData.append('title', title);
			formData.append('text', text);
			formData.append('category', category);
			formData.append('tags', JSON.stringify(tags));
			formData.append('userId', authUser._id);
			formData.append('articleId', article._id);
			if (imageFile) {
				formData.append('image', imageFile);
			} else {
				formData.append('image', imagePreview);
			}

			const data: any = await dispatch(editArticle(formData));

			if (data.success) {
				redirectTo(`/article/${data.article.slug}`);
			}

			return data;
		}
	};

	if (!article) {
		return <Loader disableMargin />;
	}

	return (
		<section className='edit-article'>
			<Helmet>
				<title>Edit article / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{article && <Form article={article} handleSubmit={handleArticleFormSubmit} />}
		</section>
	);
};

export default EditArticle;
