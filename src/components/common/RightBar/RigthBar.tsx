import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

import TopTags from './TopTags';
import TopArticles from './TopArticles';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		position: 'sticky',
		top: Number(theme.mixins.toolbar.minHeight) + 20,
		marginBottom: 20,
	},
	'@media (max-width:1000px)': {
		root: {
			position: 'static',
		},
	},
}));

const RightBar: React.FC = () => {
	const classes = useStyles();

	return (
		<aside className={classNames('right-bar', classes.root)}>
			<TopTags />

			<TopArticles />
		</aside>
	);
};

export default RightBar;
