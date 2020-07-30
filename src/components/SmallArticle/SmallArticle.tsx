import React, {useState} from 'react';
import moment from 'moment';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CardActionArea from '@material-ui/core/CardActionArea';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/Share';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlagIcon from '@material-ui/icons/Flag';
import Divider from '@material-ui/core/Divider';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {useSelector, shallowEqual} from 'react-redux';

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import {useStyles} from './style';
import {userLink} from '@utils/users';
import {getCommentsCount} from '@utils/articles';
import {IArticle, RootState} from '@store/types';
import ZoomTooltip from '@components/tooltips/ZoomTooltip';
import {UserAvatar} from '@components/avatars';

type Props = {
	article: IArticle;
	lazy?: boolean;
};

const SmallArticle: React.FC<Props> = ({article, lazy}) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<Card className={classNames('small-article', classes.root)}>
			<CardHeader
				avatar={
					<Link underline='none' component={RouterLink} to={userLink(article.user)}>
						<UserAvatar user={article.user} />
					</Link>
				}
				action={
					<>
						<ZoomTooltip title='Add to bookmarks'>
							<IconButton>
								{auth.user.bookmarks.includes(article._id) ? (
									<BookmarkIcon color='primary' />
								) : (
									<BookmarkBorderIcon />
								)}
							</IconButton>
						</ZoomTooltip>

						<ZoomTooltip title='Share'>
							<IconButton>
								<ShareIcon />
							</IconButton>
						</ZoomTooltip>

						<IconButton onClick={openMenu}>
							<MoreHorizIcon />
						</IconButton>
					</>
				}
				title={
					<ZoomTooltip title={`${article.user.firstName} ${article.user.lastName}`.trim()}>
						<Typography variant='body2' style={{display: 'inline', marginRight: 10}}>
							<Link
								underline='none'
								color='inherit'
								component={RouterLink}
								to={userLink(article.user)}
							>
								{`${article.user.firstName} ${article.user.lastName}`.trim()}
							</Link>
						</Typography>
					</ZoomTooltip>
				}
				subheader={moment(article.created).fromNow()}
			/>

			{article.image || article.video ? (
				<CardActionArea className={classes.imageWrapper}>
					<Link
						underline='none'
						component={RouterLink}
						to={`/article/${article.slug}`}
						color='inherit'
					>
						<LazyLoadImage
							src={
								article.image
									? `${process.env.REACT_APP_CLOUD_IMAGE_URI}/ar_2.5,c_crop,q_65/${article.image}`
									: `${process.env.REACT_APP_CLOUD_VIDEO_URI}/ar_2.5,c_crop,q_65/${article.video}.jpg`
							}
							title={article.title}
							width='100%'
							height='300px'
							effect='blur'
							alt={article.title}
							className={classes.image}
						/>
					</Link>
				</CardActionArea>
			) : (
				<Divider />
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
					{article.text.trim().length > 500
						? `${article.text.trim().slice(0, 500)}...`
						: article.text.trim()}
				</Typography>
			</CardContent>

			<CardActions className={classes.cardActions}>
				<Link underline='none' component={RouterLink} to={`/article/${article.slug}`}>
					<Button size='small' variant='contained' color='primary' className='button'>
						Read more
					</Button>
				</Link>

				<div className={classes.statistics}>
					<Typography className={classes.views}>
						<VisibilityIcon fontSize='small' className={classes.icon} />
						{article.views}
					</Typography>
					<Typography className={classes.comments}>
						<QuestionAnswerIcon fontSize='small' className={classes.icon} />
						{getCommentsCount(article)}
					</Typography>
				</div>
			</CardActions>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
				<MenuItem onClick={closeMenu}>
					<ListItemIcon>
						<FlagIcon fontSize='small' />
					</ListItemIcon>
					<ListItemText primary='Report' />
				</MenuItem>
			</Menu>
		</Card>
	);
};

export default SmallArticle;
