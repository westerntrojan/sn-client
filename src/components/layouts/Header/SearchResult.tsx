import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import _ from 'lodash';

import {userLink} from '@utils/users';
import callApi from '@utils/callApi';
import {IArticle, IUser} from '@store/types';
import Loader from '@components/loaders/Loader';

const useStyles = makeStyles({
	root: {
		width: 450,
		maxHeight: 500,
		overflow: 'auto',
		position: 'absolute',
		marginTop: 10,
	},
	articles: {},
	users: {},
	title: {
		margin: 20,
	},
	notFoundMessage: {
		textAlign: 'center',
		margin: 20,
	},
});

type Props = {
	searchQuery: string;
	handleLinkClick: () => void;
};

const SearchResult: React.FC<Props> = ({searchQuery, handleLinkClick}) => {
	const classes = useStyles();

	const [articles, setArticles] = useState<IArticle[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			setLoading(true);

			const {result} = await callApi.get(`/search?search_query=${searchQuery}`);

			if (_.isEmpty(result.articles) && _.isEmpty(result.users)) {
				setNotFound(true);
			} else {
				setNotFound(false);
			}

			setArticles(result.articles);
			setUsers(result.users);

			setLoading(false);
		};

		if (searchQuery) {
			fetchData();
		}
	}, [searchQuery]);

	return (
		<Paper className={classes.root}>
			{loading && <Loader />}

			{!loading && notFound && (
				<Typography className={classes.notFoundMessage}>
					No results found for query "{searchQuery}"
				</Typography>
			)}

			{!loading && !_.isEmpty(articles) && (
				<>
					<Typography variant='h5' className={classes.title}>
						Articles
					</Typography>

					<List className={classes.articles}>
						{articles.map(article => (
							<div key={article._id}>
								<ListItem
									button
									onClick={handleLinkClick}
									component={RouterLink}
									to={`/article/${article.slug}`}
								>
									<ListItemText
										primary={article.title}
										secondary={
											article.text.length > 150 ? article.text.slice(0, 150) + '...' : article.text
										}
									/>
								</ListItem>
								<Divider />
							</div>
						))}
					</List>
				</>
			)}

			{!loading && !_.isEmpty(users) && (
				<>
					<Typography variant='h5' className={classes.title}>
						Users
					</Typography>

					<List className={classes.users}>
						{users.map(user => (
							<div key={user._id}>
								<ListItem
									button
									onClick={handleLinkClick}
									component={RouterLink}
									to={userLink(user)}
								>
									<ListItemText
										primary={`${user.firstName} ${user.lastName}`.trim()}
										secondary={user.username ? user.username : ''}
									/>
								</ListItem>
								<Divider />
							</div>
						))}
					</List>
				</>
			)}
		</Paper>
	);
};

export default SearchResult;
