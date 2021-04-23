import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {ICategory} from '@/store/types';
import Paper from '@material-ui/core/Paper';

import CategoryItem from './CategoryItem';
import Loader from '@/components/common/loaders/Loader';

const useStyles = makeStyles({
	title: {
		marginBottom: 20,
	},
});

type Props = {
	loading: boolean;
	categories: ICategory[];
};

const CategoryList: React.FC<Props> = ({loading, categories}) => {
	const classes = useStyles();

	return (
		<div className='category-list'>
			<Typography variant='h5' className={classes.title}>
				Categories
			</Typography>

			{loading && <Loader />}

			{!loading && !Boolean(categories.length) && <Typography>No categories</Typography>}

			{Boolean(categories.length) && (
				<Paper>
					<List>
						{categories.map(category => (
							<CategoryItem key={category._id} category={category} />
						))}
					</List>
				</Paper>
			)}
		</div>
	);
};

export default CategoryList;
