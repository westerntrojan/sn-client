import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Article from './components/Article';
import Loader from '@components/loaders/Loader';
import Context from '@App/context';
import {IArticle} from '@store/types';

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
	'@media (max-width:1000px)': {
		root: {
			display: 'none',
		},
	},
}));

const TopArticles: React.FC = () => {
	const classes = useStyles();

	const {topArticles, loadingData} = useContext(Context);

	return (
		<Paper
			className={classNames('top-articles', classes.root, {[classes.rootLoading]: loadingData})}
		>
			<Typography variant='overline' className={classes.title}>
				Read now
			</Typography>

			{loadingData && <Loader />}

			{!loadingData && (
				<List className={classes.list}>
					{topArticles.map((article: IArticle) => (
						<Article article={article} key={article._id} />
					))}
				</List>
			)}
		</Paper>
	);
};

export default TopArticles;
