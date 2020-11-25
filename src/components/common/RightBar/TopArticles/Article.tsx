import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link as RouterLink} from 'react-router-dom';

import {IArticle} from '@store/types';

const useStyles = makeStyles({
	root: {
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
	},
	title: {
		// marginBottom: 5
	},
	statistics: {
		display: 'flex',
		alignItems: 'center',
	},
	views: {
		marginRight: '10px',
		fontSize: '12px',
		opacity: 0.5,
		display: 'flex',
		alignItems: 'center',
	},
	comments: {
		fontSize: '12px',
		opacity: 0.5,
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: '4px',
	},
});

type Props = {
	article: IArticle;
};

const Article: React.FC<Props> = ({article}) => {
	const classes = useStyles();

	return (
		<ListItem
			className={classes.root}
			button
			component={RouterLink}
			to={`/article/${article.slug}`}
		>
			<ListItemText
				primary={
					<Typography variant='body1' className={classes.title}>
						{article.title}
					</Typography>
				}
				secondary={
					<div className={classes.statistics}>
						<Typography className={classes.views}>
							<VisibilityIcon fontSize='small' className={classes.icon} />
							{article.views}
						</Typography>
						<Typography className={classes.comments}>
							<QuestionAnswerIcon fontSize='small' className={classes.icon} />
							{article.comments.length}
						</Typography>
					</div>
				}
				disableTypography
			/>
		</ListItem>
	);
};

export default Article;
