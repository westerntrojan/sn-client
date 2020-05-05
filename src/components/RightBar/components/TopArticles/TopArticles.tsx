import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Article from './components/Article';
import Loader from '@components/Loader';
import Context, {IContext} from '@App/context';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: theme.spacing(0.5),
	},
	rootLoading: {
		padding: theme.spacing(0.5),
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	title: {
		margin: theme.spacing(0.5),
	},
	list: {
		width: '100%',
	},
}));

const TopArticles: React.FC = () => {
	const classes = useStyles();

	const {topArticles, loading}: IContext = useContext(Context);

	return (
		<Paper className={classNames('top-articles', classes.root, {[classes.rootLoading]: loading})}>
			<Typography variant='overline' className={classes.title}>
				Read now
			</Typography>

			{loading && <Loader />}

			{!loading && (
				<List className={classes.list}>
					{topArticles.map(article => (
						<Article article={article} key={article._id} />
					))}
				</List>
			)}
		</Paper>
	);
};

export default TopArticles;
