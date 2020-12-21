import React, {useState, useEffect, useCallback, useRef} from 'react';
import _ from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelector, shallowEqual} from 'react-redux';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';

import {IArticle, RootState} from '@store/types';
import {IArticleInputs} from './types';

const useStyles = makeStyles({
	input: {
		marginBottom: '20px',
		position: 'relative',
	},
	uploader: {
		marginBottom: '20px',
		display: 'flex',
		alignItems: 'center',
		overflow: 'hidden',
	},
	image: {
		marginLeft: 20,
	},
});

type Props = {
	article: IArticle;
	handleSubmit: (updatedArticle: IArticleInputs) => void;
};

const Form: React.FC<Props> = ({article, handleSubmit}) => {
	const classes = useStyles();

	const allCategory = useSelector((state: RootState) => state.category.all, shallowEqual);

	const [title, setTitle] = useState(article.title);
	const [text, setText] = useState(article.text);
	const [tags, setTags] = useState(article.tags);
	const [category, setCategory] = useState(article.category._id);
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const inputLabelRef = useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = useState(0);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (
			title.trim() &&
			text.trim() &&
			(title !== article.title ||
				text !== article.text ||
				category !== article.category._id ||
				!_.isEqual(_.sortBy(article.tags), _.sortBy(tags)))
		) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [title, text, tags, category, article]);

	useEffect(() => {
		if (inputLabelRef.current) {
			setLabelWidth(inputLabelRef.current.offsetWidth);
		}
	}, []);

	useEffect(() => {
		validate();
	}, [validate]);

	const _handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const _handleAddTag = (newTag: string) => {
		const newTags = tags.concat(newTag);

		setTags(newTags);
	};

	const _handleRemoveTag = (removedTag: string) => {
		const newTags = tags.filter(tag => tag !== removedTag);

		setTags(newTags);
	};

	const _handleChangeCategory = (e: React.ChangeEvent<{value: unknown}>) => {
		const value = e.target.value as string;

		setCategory(value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const data: any = await handleSubmit({
			title,
			text,
			category,
			tags,
		});

		if (!data.success) {
			setLoading(false);
			enqueueSnackbar(data.message, {variant: 'error'});
		}
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent) => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handleKeyPressTextarea = (target: React.KeyboardEvent) => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<div className={'article-form'}>
			<div className='form'>
				<TextField
					label='Title'
					value={title}
					className={classes.input}
					variant='outlined'
					onChange={_handleChangeTitle}
					onKeyPress={_handleKeyPressInput}
					disabled={loading}
					autoFocus
					error={title.length > 120}
				/>
				<TextField
					label='Text'
					value={text}
					className={classes.input}
					variant='outlined'
					multiline
					rows='4'
					rowsMax='20'
					onChange={_handleChangeText}
					onKeyPress={_handleKeyPressTextarea}
					disabled={loading}
					error={text.length > 5000}
				/>
				<ChipInput
					label='Tags'
					variant='outlined'
					disabled={loading}
					className={classes.input}
					value={tags}
					onAdd={_handleAddTag}
					onDelete={_handleRemoveTag}
					onKeyPress={_handleKeyPressTextarea}
				/>
				<FormControl variant='outlined' className={classes.input} disabled={loading}>
					<InputLabel ref={inputLabelRef} id='demo-simple-select-outlined-label'>
						Category
					</InputLabel>
					<Select
						labelId='demo-simple-select-outlined-label'
						value={category}
						onChange={_handleChangeCategory}
						labelWidth={labelWidth}
					>
						{allCategory.map(category => (
							<MenuItem key={category._id} value={category._id}>
								{category.title}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button
					color='primary'
					variant='contained'
					disabled={disabledButton || loading}
					onClick={_handleSubmit}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default Form;
