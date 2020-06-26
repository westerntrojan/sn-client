import {IArticle} from '@store/types';

export const getCommentsCount = (article: IArticle): number => {
	const commentsCount = article.comments.reduce(
		(acc, comment) => acc + comment.replies.length + 1,
		0,
	);

	return commentsCount;
};
