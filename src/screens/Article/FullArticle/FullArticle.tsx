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
import {Video, Audio, CloudinaryContext} from 'cloudinary-react';
import _ from 'lodash';
import {useDispatch} from 'react-redux';

import {useStyles} from './FullArticleStyle';
import {userLink} from '@utils/users';
import {getCommentsCount} from '@utils/articles';
import {IArticle} from '@store/types';
import {ImageModal} from '@components/common/modals';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import {UserAvatar} from '@components/common/avatars';
import Context from '@screens/Article/context';
import {useAuthModal} from '@utils/hooks';
import {subscribeToUser} from '@store/auth/actions';
import ShareMenu from '@components/common/ShareMenu';
import ImageGallery from '@components/common/ImageGallery';

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

	const [moreMenuEl, setMoreMenuEl] = useState<HTMLElement | null>(null);
	const [shareMenuEl, setShareMenuEl] = useState<HTMLElement | null>(null);
	const [imageModal, setImageModal] = useState(false);

	const {auth} = useContext(Context);

	const dispatch = useDispatch();

	const {openAuthModal} = useAuthModal();

	const openMoreMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setMoreMenuEl(e.currentTarget);
	};
	const closeMoreMenu = (): void => {
		setMoreMenuEl(null);
	};
	const openShareMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setShareMenuEl(e.currentTarget);
	};
	const closeShareMenu = (): void => {
		setShareMenuEl(null);
	};

	const handleSubscribe = (): void => {
		if (!auth.isAuth) {
			openAuthModal();
		}

		dispatch(subscribeToUser(article.user._id));
	};

	return (
		<Card className={classNames('full-article', classes.root)}>
			<CardHeader
				avatar={<UserAvatar user={article.user} link />}
				action={
					<>
						<IconButton onClick={addToBookmarks}>
							{auth.user.bookmarks.includes(article._id) ? (
								<BookmarkIcon color='primary' />
							) : (
								<BookmarkBorderIcon />
							)}
						</IconButton>

						<IconButton onClick={openShareMenu}>
							<ShareIcon />
						</IconButton>

						<IconButton onClick={openMoreMenu}>
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

			{/* images */}
			{!!article.images.length && (
				<ImageGallery
					images={article.images.map(
						image => `${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65/${image}`,
					)}
					withModal
				/>
			)}

			{/* image */}
			{article.image && (
				<CardMedia
					component='img'
					alt={article.title}
					image={`${process.env.REACT_APP_CLOUD_IMAGE_URI}/ar_1.8,c_crop,q_65,fl_progressive/${article.image}`}
					title={article.title}
					className={classes.image}
					onClick={(): void => setImageModal(true)}
				/>
			)}

			{/* video */}
			{article.video && (
				<Video
					cloudName={process.env.REACT_APP_CLOUD_NAME}
					publicId={article.video}
					className={classes.video}
					effect='volume:-50'
					quality='auto:low'
					controls
				>
					Cannot display
					<b>video</b>.
				</Video>
			)}

			{!article.image && !!!article.images.length && !article.video && <Divider />}

			<CardContent>
				<div className={classes.content}>
					<Typography variant='h5' className={classes.title}>
						{article.title}
					</Typography>

					<Typography>{article.text}</Typography>

					{!_.isEmpty(article.audio) && (
						<CloudinaryContext
							cloudName={process.env.REACT_APP_CLOUD_NAME}
							className={classes.audioList}
							effect='volume:-50'
						>
							{article.audio.map(audioTrack => (
								<div key={audioTrack.publicId}>
									<div className={classes.audioItem}>
										<Typography className={classes.audioTitle} variant='subtitle2'>
											{audioTrack.filename}
										</Typography>

										<Audio publicId={audioTrack.publicId} className={classes.audioTrack} controls>
											Cannot play
											<b>audio</b>.
										</Audio>
									</div>
									<Divider />
								</div>
							))}
						</CloudinaryContext>
					)}
				</div>

				<Typography>
					Category:{' '}
					<Link component={RouterLink} to={`/category/${article.category.slug}`}>
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

				{article.user._id !== auth.user._id && !auth.user.subscriptions.includes(article.user._id) && (
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
							onClick={handleSubscribe}
							startIcon={<AddIcon />}
						>
							Subscribe
						</Button>
					</Box>
				)}
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
				image={`${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65,fl_progressive/${article.image}`}
				closeModal={(): void => setImageModal(false)}
			/>

			<ShareMenu
				anchorEl={shareMenuEl}
				closeMenu={closeShareMenu}
				url={`https://delo.westerntrojan.now.sh/article/${article.slug}`}
			/>

			<Menu anchorEl={moreMenuEl} keepMounted open={Boolean(moreMenuEl)} onClose={closeMoreMenu}>
				{(auth.user && auth.user._id === article.user._id) || auth.isAdmin ? (
					<div>
						<MenuItem onClick={closeMoreMenu}>
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
								closeMoreMenu();

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
					<MenuItem onClick={closeMoreMenu}>
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