import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {useLocation} from 'react-router';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		borderLeft: `2px solid ${theme.palette.secondary.main}`,
	},
}));

type Props = {
	text: string;
};

const ForNotAuth: React.FC<Props> = ({text}) => {
	const classes = useStyles();

	const location = useLocation();

	return (
		<div>
			<Paper className={classes.root}>
				<Typography>
					{text}&nbsp;
					<Link component={RouterLink} to={{pathname: '/auth', state: {from: location}}}>
						Come in
					</Link>
					, please.
				</Typography>
			</Paper>
		</div>
	);
};

export default ForNotAuth;
