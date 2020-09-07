import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import {loader} from 'graphql.macro';
import {useQuery} from 'react-apollo';

import Loader from '@components/common/loaders/Loader';

const GetTopTags = loader('./gql/GetTopTags.gql');

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginBottom: 20,
		padding: theme.spacing(0.5),
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	rootLoading: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {},
	link: {
		cursor: 'pointer',
	},
	'@media (max-width:1000px)': {
		root: {
			marginBottom: 0,
		},
		title: {
			display: 'none',
		},
	},
}));

const TopTags: React.FC = () => {
	const classes = useStyles();

	const {loading, data} = useQuery<{topTags: string[]}>(GetTopTags);

	return (
		<Paper className={classNames('top-tags', classes.root, {[classes.rootLoading]: loading})}>
			<Typography variant='overline' className={classes.title}>
				Most popular tags
			</Typography>

			{loading && <Loader />}

			{!loading &&
				data &&
				data.topTags.map((tag: string) => (
					<Chip
						label={`#${tag}`}
						color='primary'
						key={tag}
						clickable
						component={RouterLink}
						to={`/tag/${tag}`}
					/>
				))}
		</Paper>
	);
};

export default TopTags;
