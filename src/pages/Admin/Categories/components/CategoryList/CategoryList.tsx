import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {ICategory} from '@store/types';
import Paper from '@material-ui/core/Paper';

import CategoryItem from './components/CategoryItem';

const useStyles = makeStyles({
	title: {
		marginBottom: 20,
	},
});

type Props = {
	allCategory: ICategory[];
	handleEditCategory: (category: ICategory) => void;
	handleRemoveCategory: (categoryId: string) => void;
};

const CategoryList: React.FC<Props> = ({allCategory, handleEditCategory, handleRemoveCategory}) => {
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
							<CategoryItem
								key={category._id}
								category={category}
								handleEditCategory={handleEditCategory}
								handleRemoveCategory={handleRemoveCategory}
							/>
						))}
					</List>
				</Paper>
			)}
		</div>
	);
};

export default CategoryList;
