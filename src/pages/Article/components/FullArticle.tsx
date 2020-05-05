import React, {useState} from 'react';
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
import LinkIcon from '@material-ui/icons/Link';
import CopyToClipboard from 'react-copy-to-clipboard';
import Chip from '@material-ui/core/Chip';
import {useHistory} from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import classNames from 'classnames';
import {useSnackbar} from 'notistack';

import {userLink} from '@utils/users';
import {IArticle} from '@store/types';
import {AuthState} from '@store/auth/types';
import {ImageModal} from '@components/modals';

const useStyles = makeStyles(theme => ({
	root: {
		wordWrap: 'break-word',
	},
	mainContent: {
		marginBottom: 20,
	},
	media: {
		height: '600px',
		cursor: 'pointer',
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
	tags: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: 20,
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	likes: {
		marginTop: 20,
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
	},
	icon: {
		marginRight: '4px',
	},
	linkIcon: {
		transform: 'rotate(135deg)',
	},
}));

type Props = {
	article: IArticle;
	auth: AuthState;
	handleLike: () => void;
	handleRemove: () => void;
};

const FullArticle: React.FC<Props> = ({article, auth, handleLike, handleRemove}) => {
	const classes = useStyles();

	const [imageModal, setImageModal] = useState(false);

	const history = useHistory();

	const {enqueueSnackbar} = useSnackbar();

	const _handleClickCopyLink = (): void => {
		enqueueSnackbar('Link copied successfully', {variant: 'success', preventDuplicate: true});
	};

	return (
		<Card className={classNames('full-article', classes.root)}>
			{article.image && (
				<CardMedia
					component='img'
					alt={article.title}
					image={article.image}
					title={article.title}
					className={classes.media}
					onClick={(): void => setImageModal(true)}
				/>
			)}
			<CardContent>
				<div className={classes.mainContent}>
					<Typography variant='h5' className={classes.title}>
						{article.title}
						<CopyToClipboard text={window.location.href} onCopy={_handleClickCopyLink}>
							<IconButton color='primary'>
								<LinkIcon className={classes.linkIcon} />
							</IconButton>
						</CopyToClipboard>
					</Typography>
					<Typography>{article.text}</Typography>
				</div>
				<Typography>
					Category:{' '}
					<Link underline='none' component={RouterLink} to={`/category/${article.category.slug}`}>
						{article.category.title}
					</Link>
				</Typography>
				{Boolean(article.tags.length) && (
					<div className={classes.tags}>
						{article.tags.map((tag: string) => (
							<Chip
								label={`#${tag}`}
								color='primary'
								style={{color: 'white'}}
								clickable
								component={RouterLink}
								to={`/tag/${tag}`}
								key={tag}
							/>
						))}
					</div>
				)}
				<div className={classes.likes}>
					<IconButton onClick={auth.isAuth ? handleLike : (): void => history.push('/auth')}>
						{auth.user.likedArticles.includes(article._id) ? (
							<FavoriteIcon color='primary' />
						) : (
							<FavoriteIcon />
						)}
					</IconButton>
					<Typography variant='inherit'>{article.likes}</Typography>
				</div>
			</CardContent>
			<CardActions className={classes.actions}>
				<div className={'buttons'}>
					{(auth.user && auth.user._id === article.user._id) || auth.isAdmin ? (
						<>
							<Link underline='none' component={RouterLink} to={`/article/${article.slug}/edit`}>
								<Button size='small' color='primary' variant='contained' className='button'>
									Edit
								</Button>
							</Link>
							<Button size='small' variant='outlined' color='secondary' onClick={handleRemove}>
								Remove
							</Button>
						</>
					) : null}
				</div>

				<div className={classes.info}>
					<Typography className={'small'}>
						<Link
							underline='none'
							component={RouterLink}
							to={userLink(article.user)}
							color='inherit'
						>
							{`${article.user.firstName} ${article.user.lastName}`.trim()}
						</Link>
					</Typography>

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

					<Typography className={'small'}>{moment(article.created).format('LL')}</Typography>
				</div>
			</CardActions>

			{imageModal && (
				<ImageModal image={article.image} closeModal={(): void => setImageModal(false)} />
			)}
		</Card>
	);
};

export default FullArticle;
