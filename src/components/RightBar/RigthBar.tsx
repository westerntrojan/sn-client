import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core';

import './style.scss';
import TopTags from './components/TopTags';
import TopArticles from './components/TopArticles';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		position: 'sticky',
		top: Number(theme.mixins.toolbar.minHeight) + 20,
		marginBottom: 20,
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
