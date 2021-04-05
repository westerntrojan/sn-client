import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {ICategory} from '@store/types';
import Paper from '@material-ui/core/Paper';

import CategoryItem from './CategoryItem';

const useStyles = makeStyles({
	title: {
		marginBottom: 20,
	},
});

type Props = {
	allCategory: ICategory[];
};

const CategoryList: React.FC<Props> = ({allCategory}) => {
	const classes = useStyles();

	return (
		<div className='category-list'>
			<Typography variant='h5' className={classes.title}>
				Categories
			</Typography>

			{!Boolean(allCategory.length) && <Typography>No categories</Typography>}

			{Boolean(allCategory.length) && (
				<Paper>
					<List>
						{allCategory.map(category => (
							<CategoryItem key={category._id} category={category} />
						))}
					</List>
				</Paper>
			)}
		</div>
	);
};

export default CategoryList;
