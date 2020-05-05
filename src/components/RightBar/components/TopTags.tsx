import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';

import Loader from '@components/Loader';
import Context, {IContext} from '@App/context';

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
	title: {
		'@media (max-width:1000px)': {
			display: 'none',
		},
	},
	link: {
		cursor: 'pointer',
	},
}));

const TopTags: React.FC = () => {
	const classes = useStyles();

	const {topTags, loading}: IContext = useContext(Context);

	return (
		<Paper className={classNames('top-tags', classes.root, {[classes.rootLoading]: loading})}>
			<Typography variant='overline' className={classes.title}>
				Most popular tags
			</Typography>

			{loading && <Loader />}

			{!loading &&
				topTags.map((tag: string) => (
					<Chip
						label={`#${tag}`}
						color='primary'
						style={{color: 'white'}}
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
