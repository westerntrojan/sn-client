import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {ICategory} from '@store/types';

const useStyles = makeStyles({
	root: {
		marginBottom: 20,
		wordWrap: 'break-word',
	},
	mainContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	info: {
		marginBottom: 20,
	},
	text: {
		marginBottom: 10,
	},
	more: {
		cursor: 'pointer',
	},
});

type Props = {
	category: ICategory;
};

const About: React.FC<Props> = ({category}) => {
	const classes = useStyles();

	const [fullDesc, setFullDesc] = useState(true);

	useEffect(() => {
		if (category.desc.length > 200) {
			setFullDesc(false);
		}
	}, [category]);

	return (
		<div className={classes.root}>
			<div className={classes.mainContent}>
				<Typography variant='h4'>{category.title}</Typography>
				<div>
					<IconButton>
						<MoreHoriz />
					</IconButton>
					<Button
						color='primary'
						variant='contained'
						startIcon={<AddIcon />}
						onClick={(): void => console.log('subscribe')}
					>
						Subscribe
					</Button>
				</div>
			</div>
			<div className={classes.info}>
				<Typography className={classes.text}>
					{fullDesc ? category.desc : category.desc.slice(0, 200)}{' '}
					{!fullDesc && (
						<Typography
							variant='inherit'
							color='primary'
							className={classes.more}
							onClick={(): void => setFullDesc(true)}
						>
							more
						</Typography>
					)}
				</Typography>

				<Typography variant='inherit'>
					<Typography color='primary' variant='inherit'>
						{category.subs}
					</Typography>{' '}
					subscribers
				</Typography>
			</div>

			<Divider />
		</div>
	);
};

export default About;
