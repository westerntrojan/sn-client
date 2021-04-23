import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import {useParams, useHistory} from 'react-router';
import SortIcon from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {loader} from 'graphql.macro';
import {useMutation as useApolloMutation} from 'react-apollo';
import {useQuery as useRQQuery, useMutation as useRQMutation} from 'react-query';
import _ from 'lodash';

import './Article.scss';
import {RemoveModal} from '@/components/common/modals';
import FullArticle from './FullArticle';
import FullArticleSkeleton from './FullArticle/FullArticleSkeleton';
import CommentForm from './CommentForm';
import CommentReplies from './CommentReplies';
import {getCommentsCount} from '@/utils/articles';
import ZoomTooltip from '@/components/common/tooltips/ZoomTooltip';
import {IArticle, RootState} from '@/store/types';
import {IComment} from '@/store/types';
import Context from './context';
import {addToBookmarks, removeFromBookmarks} from '@/store/auth/actions';
import callApi from '@/utils/callApi';
import {updateCache} from '@/queryClient';
import {useAuthModal} from '@/utils/hooks';

const AddView = loader('./gql/AddView.gql');
const AddLike = loader('./gql/AddLike.gql');
const AddDislike = loader('./gql/AddDislike.gql');
const AddToBookmarks = loader('./gql/AddToBookmarks.gql');

const Article: React.FC = () => {
	const {slug} = useParams<{slug: string}>();
	const history = useHistory();

	const [removeArticleModal, setRemoveArticleModal] = useState(false);
	const [removeCommentModal, setRemoveCommentModal] = useState(false);
	const [removeReplyModal, setRemoveReplyModal] = useState(false);
	const [removedCommentId, setRemovedCommentId] = useState('');
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	const {openAuthModal} = useAuthModal();

	// react-query
	const {isLoading: loadingArticle, data: article = {} as IArticle} = useRQQuery<IArticle>(
		`/articles/${slug}`,
		async () => {
			const {article} = await callApi.get(`/articles/${slug}`);

			return article;
		},
	);

	const {mutateAsync: addComment} = useRQMutation(
		(text: string) =>
			callApi.post('/articles/comments', {text, articleId: article._id, user: auth.user._id}),
		{
			onSuccess(data) {
				if (data.success) {
					updateCache<IArticle>(`/articles/${slug}`, article => ({
						...article,
						comments: [data.comment, ...article.comments],
					}));
				}
			},
		},
	);
	const {mutate: removeArticle} = useRQMutation(() => callApi.delete(`/articles/${article._id}`), {
		onSuccess() {
			setRemoveArticleModal(false);

			history.push('/');
		},
	});
	const {mutate: removeComment} = useRQMutation(
		() => callApi.delete(`/articles/comments/${removedCommentId}`),
		{
			onSuccess(data) {
				updateCache<IArticle>(`/articles/${slug}`, article => ({
					...article,
					comments: article.comments.filter(comment => comment._id !== data.comment._id),
				}));

				setRemoveCommentModal(false);
			},
		},
	);
	const {mutateAsync: addReply} = useRQMutation(
		(reply: IComment) =>
			callApi.post('/articles/comments/replies', {
				...reply,
				articleId: article._id,
				user: auth.user._id,
			}),
		{
			onSuccess(data) {
				updateCache<IArticle>(`/articles/${slug}`, article => {
					const comments = article.comments.map(comment => {
						if (comment._id === data.reply.parentId) {
							comment.replies.push(data.reply);

							return comment;
						}

						return comment;
					});

					return {
						...article,
						comments,
					};
				});
			},
		},
	);
	const {mutate: removeReply} = useRQMutation(
		() => callApi.delete(`/articles/comments/replies/${removedCommentId}`),
		{
			onSuccess(data) {
				updateCache<IArticle>(`/articles/${slug}`, article => {
					const comments = article.comments.map(comment => {
						if (comment._id === data.reply.parentId) {
							return {
								...comment,
								replies: comment.replies.filter(reply => reply._id !== data.reply._id),
							};
						}

						return comment;
					});

					return {
						...article,
						comments,
					};
				});

				setRemoveReplyModal(false);
			},
		},
	);
	const {mutate: addCommentLike} = useRQMutation(
		(commentId: string) => callApi.get(`/articles/comments/like/${commentId}`),
		{
			onMutate(commentId) {
				updateCache<IArticle>(`/articles/${slug}`, article => {
					const comments = article.comments.map(comment => {
						if (comment._id === commentId) {
							comment.likes = comment.likes + 1;
						}

						comment.replies.forEach(reply => {
							if (reply._id === commentId) {
								reply.likes = reply.likes + 1;
							}
						});

						return comment;
					});

					return {
						...article,
						comments,
					};
				});
			},
		},
	);
	const {mutate: addCommentDislike} = useRQMutation((commentId: string) =>
		callApi.get(`/articles/comments/dislike/${commentId}`),
	);

	// graphql
	const [addViewMutation] = useApolloMutation(AddView);
	const [addLikeMutation] = useApolloMutation(AddLike);
	const [addDislikeMutation] = useApolloMutation(AddDislike);
	const [addToBookmarksMutation] = useApolloMutation(AddToBookmarks);

	const openSortMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};
	const closeSortMenu = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (!loadingArticle) {
			addViewMutation({variables: {id: article._id}});
		}
	}, [loadingArticle]);

	const handleAddArticleLike = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		updateCache<IArticle>(`/articles/${slug}`, article => ({
			...article,
			likes: article.likes + 1,
		}));

		addLikeMutation({variables: {id: article._id}});
	};
	const handleAddArticleDislike = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		updateCache<IArticle>(`/articles/${slug}`, article => ({
			...article,
			dislikes: article.dislikes + 1,
		}));

		addDislikeMutation({variables: {id: article._id}});
	};
	const handleAddToBookmarks = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		if (auth.user.bookmarks.includes(article._id)) {
			dispatch(removeFromBookmarks(article._id));
		} else {
			dispatch(addToBookmarks(article._id));
		}

		addToBookmarksMutation({
			variables: {userId: auth.user._id, articleId: article._id},
		});
	};

	const handleTopCommentsSort = () => {
		updateCache<IArticle>(`/articles/${slug}`, article => {
			const comments = _.orderBy(article.comments, 'likes', 'desc');

			return {...article, comments};
		});

		closeSortMenu();
	};
	const handleNewestFirstSorrt = () => {
		updateCache<IArticle>(`/articles/${slug}`, article => {
			const comments = _.orderBy(article.comments, 'created', 'desc');

			return {...article, comments};
		});

		closeSortMenu();
	};

	return (
		<section className='article'>
			<Helmet>
				<title>
					{!loadingArticle ? article.title : 'Article'} / {process.env.REACT_APP_TITLE}
				</title>
			</Helmet>

			<Context.Provider
				value={{
					auth,
					handleSubmitReply: addReply,
					handleRemoveReply: (commentId: string) => {
						setRemovedCommentId(commentId);
						setRemoveReplyModal(true);
					},
				}}
			>
				{loadingArticle ? (
					<FullArticleSkeleton />
				) : (
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
									<MenuItem onClick={handleTopCommentsSort}>Top Comments</MenuItem>
									<MenuItem onClick={handleNewestFirstSorrt}>Newest first</MenuItem>
								</Menu>
							</div>

							<CommentForm onSubmit={addComment} />

							<div className='comments-list'>
								{article.comments.map((comment: IComment) => (
									<CommentReplies
										key={comment._id}
										comment={comment}
										addLike={commentId => {
											if (!auth.isAuth) {
												return openAuthModal();
											}

											addCommentLike(commentId);
										}}
										addDislike={commentId => {
											if (!auth.isAuth) {
												return openAuthModal();
											}

											addCommentDislike(commentId);
										}}
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
				action={removeArticle}
				closeModal={() => setRemoveArticleModal(false)}
			/>
			<RemoveModal
				open={removeCommentModal}
				text='Do you want to remove this comment?'
				action={removeComment}
				closeModal={() => setRemoveCommentModal(false)}
			/>
			<RemoveModal
				open={removeReplyModal}
				text='Do you want to remove this reply?'
				action={removeReply}
				closeModal={() => setRemoveReplyModal(false)}
			/>
		</section>
	);
};

export default Article;
