import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useParams} from 'react-router';
import {Helmet} from 'react-helmet';

import PageLoader from '@components/PageLoader';
import Form from './components/Form';
import {editArticle} from '@store/articles/actions';
import {AppState} from '@store/types';
import {IArticleInputs} from './types';
import {useArticle, useRedirect} from '@utils/hooks';

const EditArticle: React.FC = () => {
	const {slug} = useParams();

	const [article, setArticleSlug] = useArticle();
	const redirectTo = useRedirect();

	const authUser = useSelector((state: AppState) => state.auth.user, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		if (slug) {
			setArticleSlug(slug);
		}
	}, [slug, setArticleSlug]);

	const handleArticleFormSubmit = async (newArticle: IArticleInputs): Promise<any> => {
		if (article) {
			const {title, text, category, tags, image, imagePreview} = newArticle;

			const formData = new FormData();
			formData.append('title', title);
			formData.append('text', text);
			formData.append('category', category);
			formData.append('tags', JSON.stringify(tags));
			formData.append('userId', authUser._id);
			if (image) {
				formData.append('image', image);
			}
			formData.append('imagePreview', imagePreview);
			formData.append('articleId', article._id);

			const data: any = await dispatch(editArticle(formData));

			if (data.errors) {
				return data.errors[0];
			}

			redirectTo(`/article/${data.article.slug}`);
		}
	};

	if (!article) {
		return <PageLoader />;
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
