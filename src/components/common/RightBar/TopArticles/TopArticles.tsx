import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo';
import {IArticle} from '@store/types';

import Article from './Article';
import Loader from '@components/common/loaders/Loader';

const GetTopArticles = loader('./gql/GetTopArticles.gql');

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

	const {loading, data} = useQuery<{topArticles: IArticle[]}, {limit: number}>(GetTopArticles, {
		variables: {limit: 5},
	});

	return (
		<Paper className={classNames('top-articles', classes.root, {[classes.rootLoading]: loading})}>
			<Typography variant='overline' className={classes.title}>
				Read now
			</Typography>

			{loading && <Loader />}

			{data && (
				<List className={classes.list}>
					{data.topArticles.map((article: IArticle) => (
						<Article article={article} key={article._id} />
					))}
				</List>
			)}
		</Paper>
	);
};

export default TopArticles;
