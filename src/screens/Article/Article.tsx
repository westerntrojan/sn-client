import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router';
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {loader} from 'graphql.macro';
import {useMutation} from 'react-apollo';

import './Article.scss';
import {RemoveModal} from '@components/common/modals';
import FullArticle from './FullArticle';
import CommentForm from './CommentForm';
import CommentReplies from './CommentReplies';
import {useRedirect, useArticle, useAuthModal} from '@utils/hooks';
import {getCommentsCount} from '@utils/articles';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import {RootState} from '@store/types';
import {IComment} from '@store/types';
import * as articleActions from '@store/articles/actions';
import Context from './context';
import Loader from '@components/common/loaders/Loader';
import {addToBookmarks, removeFromBookmarks} from '@store/auth/actions';

const AddLike = loader('./gql/AddLike.gql');
const AddDislike = loader('./gql/AddDislike.gql');
const AddView = loader('./gql/AddView.gql');
const AddToBookmarks = loader('./gql/AddToBookmarks.gql');

const Article: React.FC = () => {
	const {slug} = useParams();

	const [removeArticleModal, setRemoveArticleModal] = useState(false);
	const [removeCommentModal, setRemoveCommentModal] = useState(false);
	const [removeReplyModal, setRemoveReplyModal] = useState(false);
	const [removedCommentId, setRemovedCommentId] = useState('');
	const [loading, setLoading] = useState(true);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [article, setArticleSlug] = useArticle();

	const [addLikeMutation] = useMutation(AddLike);
	const [addDislikeMutation] = useMutation(AddDislike);
	const [addViewMutation] = useMutation(AddView);
	const [addToBookmarksMutation] = useMutation(AddToBookmarks);

	const {redirectTo} = useRedirect();
	const {openAuthModal} = useAuthModal();

	const openSortMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const closeSortMenu = () => {
		setAnchorEl(null);
	};

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	const setViews = useCallback(() => {
		if (loading) {
			if (article) {
				addViewMutation({variables: {id: article._id}});

				setLoading(false);
			}
		}

		// eslint-disable-next-line
	}, [article, loading]);

	useEffect(() => {
		if (slug) {
			setArticleSlug(slug);
		}

		setViews();
	}, [slug, setArticleSlug, setViews]);

	const handleAddArticleLike = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		if (article) {
			addLikeMutation({variables: {id: article._id}});
		}
	};

	const handleAddArticleDislike = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		if (article) {
			addDislikeMutation({variables: {id: article._id}});
		}
	};

	const handleAddToBookmarks = async (): Promise<void> => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		if (article) {
			const {data} = await addToBookmarksMutation({
				variables: {userId: auth.user._id, articleId: article._id},
			});

			if (data.addToBookmarks) {
				dispatch(addToBookmarks(article._id));
			} else {
				dispatch(removeFromBookmarks(article._id));
			}
		}
	};

	const handleRemoveArticle = async (): Promise<void> => {
		if (article) {
			await dispatch(articleActions.removeArticle(article._id));

			setRemoveArticleModal(false);

			redirectTo('/');
		}
	};

	const handleSubmitComment = async (comment: {text: string}): Promise<any> => {
		if (article) {
			const data = await dispatch(
				articleActions.addComment({...comment, articleId: article._id, user: auth.user._id}),
			);

			return data;
		}
	};

	const handleRemoveComment = async (): Promise<void> => {
		await dispatch(articleActions.removeComment(removedCommentId));

		setRemoveCommentModal(false);
	};

	const handleSubmitReply = async (comment: {parentId: string; text: string}): Promise<any> => {
		if (article) {
			const data = await dispatch(
				articleActions.addReply({...comment, articleId: article._id, user: auth.user._id}),
			);

			return data;
		}
	};

	const handleRemoveReply = async (): Promise<void> => {
		await dispatch(articleActions.removeReply(removedCommentId));

		setRemoveReplyModal(false);
	};

	const _handleTopCommentsSort = () => {
		if (article) {
			dispatch(articleActions.sortCommentsByTopArticles(article._id));
		}

		closeSortMenu();
	};

	const _handleNewestFirstSort = () => {
		if (article) {
			dispatch(articleActions.sortCommentsByNewestFirst(article._id));
		}

		closeSortMenu();
	};

	const handleAddCommentLike = (commentId: string) => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		if (article) {
			dispatch(articleActions.addCommentLike(article._id, commentId));
		}
	};

	const handleAddCommentDislike = (commentId: string) => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		if (article) {
			dispatch(articleActions.addCommentDislike(article._id, commentId));
		}
	};

	return (
		<section className='article'>
			<Helmet>
				<title>
					{article ? article.title : 'Article'} / {process.env.REACT_APP_TITLE}
				</title>
			</Helmet>

			<Context.Provider
				value={{
					auth,
					handleSubmitReply,
					handleRemoveReply: (commentId: string) => {
						setRemovedCommentId(commentId);
						setRemoveReplyModal(true);
					},
				}}
			>
				{loading && <Loader disableMargin />}

				{article && (
					<>
						<FullArticle
							article={article}
							addLike={handleAddArticleLike}
							addDislike={handleAddArticleDislike}
							addToBookmarks={handleAddToBookmarks}
							handleRemove={() => setRemoveArticleModal(true)}
						/>

						<div className='comments'>
							<div className='comments-title'>
								<Typography variant='h5' className='caption'>
									{getCommentsCount(article)} Comments
								</Typography>

								<ZoomTooltip title='Sort comments'>
									<Button size='small' startIcon={<SortIcon />} onClick={openSortMenu}>
										Sort by
									</Button>
								</ZoomTooltip>
								<Menu
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={closeSortMenu}
								>
									<MenuItem onClick={_handleTopCommentsSort}>Top Comments</MenuItem>
									<MenuItem onClick={_handleNewestFirstSort}>Newest first</MenuItem>
								</Menu>
							</div>

							<CommentForm handleSubmitComment={handleSubmitComment} />

							<div className='comments-list'>
								{article.comments.map((comment: IComment) => (
									<CommentReplies
										key={comment._id}
										comment={comment}
										addLike={handleAddCommentLike}
										addDislike={handleAddCommentDislike}
										handleRemove={(commentId: string) => {
											setRemovedCommentId(commentId);
											setRemoveCommentModal(true);
										}}
									/>
								))}
							</div>
						</div>
					</>
				)}
			</Context.Provider>

			<RemoveModal
				open={removeArticleModal}
				text='Do you want to remove this article?'
				action={handleRemoveArticle}
				closeModal={() => setRemoveArticleModal(false)}
			/>
			<RemoveModal
				open={removeCommentModal}
				text='Do you want to remove this comment?'
				action={handleRemoveComment}
				closeModal={() => setRemoveCommentModal(false)}
			/>
			<RemoveModal
				open={removeReplyModal}
				text='Do you want to remove this reply?'
				action={handleRemoveReply}
				closeModal={() => setRemoveReplyModal(false)}
			/>
		</section>
	);
};

export default Article;

/* {!!article.images.length && <meta property='og:image' content={article.image[0]} />}
{article.image && <meta property='og:image' content={article.image} />}
<meta property='og:title' content='asdasd' />
<meta property='og:description' content={article.text.slice(250)} />
<meta property='og:type' content='article' />
<meta
property='og:url'
content={`https://delo.westerntrojan.now.sh/article/${article.slug}`}
/> */
