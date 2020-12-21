import React, {useState, useEffect, useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {useSelector, shallowEqual} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

import {RootState} from '@store/types';
import Footer from './Footer';
import BottomTabs from './BottomTabs';
import {Navigation, Messages, Groups} from './tabs';

const useStyles = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		position: 'relative',
	},
	list: {
		height: '100%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbar: {
		...theme.mixins.toolbar,
		boxShadow: 'none',
	},
	resizer: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 2,
		height: '100%',
		backgroundColor: 'gray',
		cursor: 'col-resize',
		zIndex: 1,
		opacity: 0,

		'&:hover': {
			opacity: 1,
		},
	},
	skeletonItem: {
		padding: 0,
		paddingBottom: 15,
	},
}));

const MainDrawer: React.FC = () => {
	const classes = useStyles();

	const [tab, setTab] = useState(0);
	const [drawerWidth, setDrawerWidth] = useState(245);
	const [mouseDown, setMouseDown] = useState(false);

	const appLoading = useSelector((state: RootState) => state.app.loading, shallowEqual);

	const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
		setTab(Number(newValue));
	};

	const handleMouseDown = (e: any) => {
		if (e.target.dataset.resizer) {
			e.preventDefault();

			setMouseDown(true);
		}
	};

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (mouseDown) {
				if (e.screenX >= 120 && e.screenX <= 380) {
					setDrawerWidth(e.screenX);
				}
			}
		},
		[mouseDown],
	);

	const handleMouseUp = () => {
		setMouseDown(false);
	};

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [handleMouseMove]);

	return (
		<Drawer
			className={classes.root}
			variant='permanent'
			PaperProps={{
				style: {
					width: drawerWidth,
				},
			}}
			style={{width: drawerWidth}}
		>
			<div className={classes.toolbar} />

			<Paper className={classes.resizer} data-resizer />

			<div className={classes.list}>
				{appLoading && (
					<List>
						<ListItem className={classes.skeletonItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
						<ListItem className={classes.skeletonItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
						<ListItem className={classes.skeletonItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
						<ListItem className={classes.skeletonItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
						<ListItem className={classes.skeletonItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
						<ListItem className={classes.skeletonItem}>
							<Skeleton variant='rect' width='100%' height={47.29} />
						</ListItem>
					</List>
				)}

				{!appLoading && tab === 0 && <Navigation />}

				{!appLoading && tab === 1 && <Messages />}

				{!appLoading && tab === 2 && <Groups />}
			</div>

			<BottomTabs value={tab} onChange={handleChangeTab} />
			<Footer />
		</Drawer>
	);
};

export default MainDrawer;
