import React from 'react';
import moment from 'moment';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CardActionArea from '@material-ui/core/CardActionArea';
import classNames from 'classnames';

import {userLink} from '@utils/users';
import {IArticle} from '@store/types';
import ZoomTooltip from '@components/tooltips/ZoomTooltip';

const useStyles = makeStyles({
	root: {
		marginBottom: 20,
		wordWrap: 'break-word',
	},
	media: {
		height: '300px',
	},
	title: {
		marginBottom: '10px',
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	statistics: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	views: {
		marginRight: '10px',
		fontSize: '14px',
		opacity: 0.8,
		display: 'flex',
		alignItems: 'center',
	},
	comments: {
		fontSize: '14px',
		opacity: 0.8,
		display: 'flex',
		alignItems: 'center',
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',

		'& button': {
			marginRight: '10px',
		},
	},
	icon: {
		marginRight: '4px',
	},
});

type Props = {
	article: IArticle;
};

const SmallArticle: React.FC<Props> = ({article}) => {
	const classes = useStyles();

	const userFullName = `${article.user.firstName} ${article.user.lastName}`.trim();

	return (
		<Card className={classNames('small-article', classes.root)}>
			{article.image && (
				<CardActionArea>
					<Link
						underline='none'
						component={RouterLink}
						to={`/article/${article.slug}`}
						color='inherit'
					>
						<CardMedia
							component='img'
							alt={article.title}
							image={article.image}
							title={article.title}
							className={classes.media}
						/>
					</Link>
				</CardActionArea>
			)}
			<CardContent>
				<Typography variant='h5' className={classes.title}>
					<Link
						underline='none'
						component={RouterLink}
						to={`/article/${article.slug}`}
						color='inherit'
					>
						{article.title}
					</Link>
				</Typography>
				<Typography>
					{article.text.length > 500 ? `${article.text.slice(0, 500)}...` : article.text}
				</Typography>
			</CardContent>
			<CardActions className={classes.actions}>
				<div className={'buttons'}>
					<Link underline='none' component={RouterLink} to={`/article/${article.slug}`}>
						<Button size='small' variant='contained' color='primary' className='button'>
							Learn More
						</Button>
					</Link>
				</div>

				<div className={classes.info}>
					<ZoomTooltip title={userFullName} placement='top'>
						<Typography className={'small'}>
							<Link
								underline='none'
								component={RouterLink}
								to={userLink(article.user)}
								color='inherit'
							>
								{userFullName}
							</Link>
						</Typography>
					</ZoomTooltip>

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

					<Typography className={'small'}>{moment(article.created).fromNow()}</Typography>
				</div>
			</CardActions>
		</Card>
	);
};

export default SmallArticle;
