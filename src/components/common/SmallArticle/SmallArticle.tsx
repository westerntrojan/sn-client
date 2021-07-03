import React, {useState, useEffect} from 'react';
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
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {useMutation} from 'react-apollo';
import {loader} from 'graphql.macro';

import {useStyles} from './SmllArticleStyle';
import {userLink} from '@/utils/users';
import {getCommentsCount} from '@/utils/articles';
import {IArticle, RootState} from '@/store/types';
import {UserAvatar} from '@/components/common/avatars';
import ShareMenu from '@/components/common/ShareMenu';
import {useAuthModal} from '@/utils/hooks';
import {addToBookmarks, removeFromBookmarks} from '@/store/auth/actions';
import {getImageLink} from '@/utils/media';

const AddToBookmarks = loader('./gql/AddToBookmarks.gql');

type Props = {
	article: IArticle;
};

const SmallArticle: React.FC<Props> = ({article}) => {
	const classes = useStyles();

	const [moreMenuEl, setMoreMenuEl] = useState<HTMLElement | null>(null);
	const [shareMenuEl, setShareMenuEl] = useState<HTMLElement | null>(null);
	const [preview, setPreview] = useState<{imageId: string; sourceType: 'image' | 'video'}>({
		imageId: '',
		sourceType: 'image',
	});

	const {openAuthModal} = useAuthModal();

	const [addToBookmarksMutation] = useMutation(AddToBookmarks);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		if (article.image) {
			setPreview(preview => ({...preview, imageId: article.image}));
		} else if (!!article.images.length) {
			setPreview(preview => ({...preview, imageId: article.images[0]}));
		} else if (article.video) {
			setPreview(preview => ({...preview, imageId: article.video, sourceType: 'video'}));
		}
	}, []);

	const openMoreMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setMoreMenuEl(e.currentTarget);
	};
	const closeMoreMenu = () => {
		setMoreMenuEl(null);
	};
	const openShareMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setShareMenuEl(e.currentTarget);
	};
	const closeShareMenu = () => {
		setShareMenuEl(null);
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

	return (
		<Card className={classNames('small-article', classes.root)}>
			<CardHeader
				avatar={<UserAvatar user={article.user} link />}
				action={
					<>
						<IconButton onClick={handleAddToBookmarks}>
							{auth.isAuth && auth.user.bookmarks.includes(article._id) ? (
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
				}
				subheader={moment(article.created).fromNow()}
			/>

			{preview.imageId && (
				<CardActionArea className={classes.imageWrapper}>
					<Link
						underline='none'
						component={RouterLink}
						to={`/article/${article.slug}`}
						color='inherit'
					>
						<LazyLoadImage
							src={getImageLink({...preview, width: 1400, height: 400})}
							// браузер автоматически выбирает нужное изображение (ссылку на него), в зависимости от размера экрана
							srcSet={`${getImageLink({...preview, width: 300, height: 400})} 300w,
											${getImageLink({...preview, width: 600, height: 400})} 600w,
											${getImageLink({...preview, width: 900, height: 400})} 900w,
											${getImageLink({...preview, width: 1200, height: 400})} 1200w,
											${getImageLink({...preview, width: 1400, height: 400})} 1400w`}
							width='100%'
							height='400'
							title={article.title}
							alt={article.title}
							className={classes.image}
							effect='blur'
						/>

						{!!article.images.length && <PhotoLibraryIcon className={classes.galleryIcon} />}
					</Link>
				</CardActionArea>
			)}

			{!article.image && !!!article.images.length && !article.video && <Divider />}

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
					<Typography variant='caption' className={classes.views}>
						<VisibilityIcon fontSize='small' className={classes.icon} />
						{article.views}
					</Typography>
					<Typography variant='caption' className={classes.comments}>
						<QuestionAnswerIcon fontSize='small' className={classes.icon} />
						{getCommentsCount(article)}
					</Typography>
				</div>
			</CardActions>

			<ShareMenu
				anchorEl={shareMenuEl}
				closeMenu={closeShareMenu}
				url={`${window.location.origin}/article/${article.slug}`}
			/>

			<Menu anchorEl={moreMenuEl} keepMounted open={Boolean(moreMenuEl)} onClose={closeMoreMenu}>
				<MenuItem onClick={closeMoreMenu}>
					<ListItemIcon>
						<FlagIcon />
					</ListItemIcon>
					<ListItemText primary='Report' />
				</MenuItem>
			</Menu>
		</Card>
	);
};

export default SmallArticle;
