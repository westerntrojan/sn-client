import React, {useState, useContext} from 'react';
import moment from 'moment';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import FlagIcon from '@material-ui/icons/Flag';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import {useStyles} from './style';
import {userLink} from '@utils/users';
import {getCommentsCount} from '@utils/articles';
import {IArticle} from '@store/types';
import {ImageModal} from '@components/modals';
import ZoomTooltip from '@components/tooltips/ZoomTooltip';
import {UserAvatar} from '@components/avatars';
import Context from '@pages/Article/context';

type Props = {
	article: IArticle;
	addLike: () => void;
	addDislike: () => void;
	addToBookmarks: () => void;
	handleRemove: () => void;
};

const FullArticle: React.FC<Props> = ({
	article,
	addLike,
	addDislike,
	addToBookmarks,
	handleRemove,
}) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [imageModal, setImageModal] = useState(false);

	const {auth} = useContext(Context);

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<Card className={classNames('full-article', classes.root)}>
			<CardHeader
				avatar={
					<Link underline='none' component={RouterLink} to={userLink(article.user)}>
						<UserAvatar user={article.user} />
					</Link>
				}
				action={
					<>
						<ZoomTooltip title='Add to bookmarks'>
							<IconButton onClick={addToBookmarks}>
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
						<Typography variant='body2' style={{display: 'inline'}}>
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
				subheader={moment(article.created).format('LL')}
			/>

			{article.image ? (
				<CardMedia
					component='img'
					alt={article.title}
					image={`${process.env.REACT_APP_CLOUD_URI}/ar_1.8,c_crop,q_65/${article.image}`}
					title={article.title}
					className={classes.media}
					onClick={(): void => setImageModal(true)}
				/>
			) : (
				<Divider />
			)}

			<CardContent>
				<div className={classes.content}>
					<Typography variant='h5' className={classes.title}>
						{article.title}
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
								clickable
								component={RouterLink}
								to={`/tag/${tag}`}
								key={tag}
							/>
						))}
					</div>
				)}

				<Box className={classes.author} borderRadius='borderRadius'>
					<div className={classes.authorInfo}>
						<UserAvatar user={article.user} />

						<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
							<Typography variant='caption' style={{textTransform: 'uppercase'}}>
								Written by
							</Typography>

							<ZoomTooltip title={`${article.user.firstName} ${article.user.lastName}`.trim()}>
								<Typography variant='subtitle1'>
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

							{article.user.bio && (
								<Typography variant='body2'>
									{article.user.bio.trim().length > 120
										? article.user.bio.trim().slice(0, 120) + '...'
										: article.user.bio.trim()}
								</Typography>
							)}
						</div>
					</div>

					<Button
						color='primary'
						variant='outlined'
						className={classes.followButton}
						startIcon={<AddIcon />}
					>
						Follow
					</Button>
				</Box>
			</CardContent>

			<CardActions className={classes.cardActions}>
				<div className={classes.actions}>
					<div className={classes.rating}>
						<div className={classes.likes}>
							<ZoomTooltip title='I like this'>
								<IconButton onClick={addLike}>
									<ThumbUpIcon />
								</IconButton>
							</ZoomTooltip>

							<span>{article.likes}</span>
						</div>

						<div className={classes.dislikes}>
							<ZoomTooltip title='I dislike this'>
								<IconButton onClick={addDislike}>
									<ThumbDownIcon />
								</IconButton>
							</ZoomTooltip>

							<span>{article.dislikes}</span>
						</div>
					</div>

					<div className={classes.bookmarks}>
						{auth.user.bookmarks.includes(article._id) ? (
							<>
								<ZoomTooltip title='Add to bookmarks'>
									<IconButton onClick={addToBookmarks}>
										<BookmarkIcon color='primary' />
									</IconButton>
								</ZoomTooltip>

								<Typography variant='body2' color='primary'>
									{article.bookmarksCount}
								</Typography>
							</>
						) : (
							<>
								<ZoomTooltip title='Add to bookmarks'>
									<IconButton onClick={addToBookmarks}>
										<BookmarkBorderIcon />
									</IconButton>
								</ZoomTooltip>

								<Typography variant='body2'>{article.bookmarksCount}</Typography>
							</>
						)}
					</div>
				</div>

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

			<ImageModal
				open={imageModal}
				image={`${process.env.REACT_APP_CLOUD_URI}/q_65/${article.image}`}
				closeModal={(): void => setImageModal(false)}
			/>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
				{(auth.user && auth.user._id === article.user._id) || auth.isAdmin ? (
					<div>
						<MenuItem onClick={closeMenu}>
							<ListItemIcon>
								<FlagIcon />
							</ListItemIcon>
							<ListItemText primary='Report' />
						</MenuItem>

						<Link
							underline='none'
							component={RouterLink}
							to={`/article/${article.slug}/edit`}
							color={'inherit'}
						>
							<MenuItem>
								<ListItemIcon>
									<EditIcon />
								</ListItemIcon>
								<ListItemText primary='Edit' />
							</MenuItem>
						</Link>

						<MenuItem
							onClick={(): void => {
								closeMenu();

								handleRemove();
							}}
						>
							<ListItemIcon>
								<DeleteIcon />
							</ListItemIcon>
							<ListItemText primary='Remove' />
						</MenuItem>
					</div>
				) : (
					<MenuItem onClick={closeMenu}>
						<ListItemIcon>
							<FlagIcon />
						</ListItemIcon>
						<ListItemText primary='Report' />
					</MenuItem>
				)}
			</Menu>
		</Card>
	);
};

export default FullArticle;
