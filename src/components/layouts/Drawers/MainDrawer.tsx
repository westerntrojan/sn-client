import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Navigation from './Lists/Navigation';
import Footer from './Footer';

const drawerWidth = 240;

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
}));

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
	};
};

const MainDrawer: React.FC<Props> = ({auth}) => {
	const classes = useStyles();

	const [route, setRoute] = useState(0);

	const location = useLocation();

	const selectNavigation = (): void => setRoute(0);

	useEffect(() => {
		if (!auth.isAuth) {
			selectNavigation();
		}
	}, [auth, location]);

	return (
		<Drawer
			className={classes.root}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar} />

			<div className={classes.list}>{route === 0 && <Navigation auth={auth} />}</div>

			<Footer />
		</Drawer>
	);
};

export default MainDrawer;
