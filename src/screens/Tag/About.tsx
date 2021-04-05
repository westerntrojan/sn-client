import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import classNames from 'classnames';

const useStyles = makeStyles({
	root: {
		marginBottom: 20,
	},
	mainContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
});

type Props = {
	tag: string | undefined;
};

const About: React.FC<Props> = ({tag}) => {
	const classes = useStyles();

	return (
		<div className={classNames('about', classes.root)}>
			<div className={classNames(classes.mainContent)}>
				<div className='text'>
					<Typography variant='h4'>{`#${tag}`}</Typography>
				</div>
				<div>
					<IconButton>
						<MoreHoriz />
					</IconButton>
				</div>
			</div>

			<Divider />
		</div>
	);
};

export default About;
