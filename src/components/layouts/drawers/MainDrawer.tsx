import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {useSelector, shallowEqual} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from '@material-ui/lab/Skeleton';

import {RootState} from '@store/types';
import Footer from './components/Footer';
import BottomTabs from './components/BottomTabs';
import {Navigation, Messages, Groups} from './components/tabs';

const drawerWidth = 245;

const useStyles = makeStyles(theme => ({
	root: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerPaper: {
		width: drawerWidth,
		overflowX: 'hidden',
	},
	list: {
		height: '100%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbar: {...theme.mixins.toolbar},
	skeletonItem: {
		padding: 0,
		paddingBottom: 15,
	},
}));

const MainDrawer: React.FC = () => {
	const classes = useStyles();

	const [tab, setTab] = useState(0);

	const appLoading = useSelector((state: RootState) => state.app.loading, shallowEqual);

	const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string): void => {
		setTab(Number(newValue));
	};

	return (
		<Drawer
			className={classes.root}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar} />

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
