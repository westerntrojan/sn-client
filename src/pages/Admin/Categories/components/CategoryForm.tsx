import React, {useState, useEffect, useCallback} from 'react';
import {makeStyles} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {useSnackbar} from 'notistack';

import {ContainedButton} from '@components/SubmitButtons';

const useStyles = makeStyles({
	title: {
		marginBottom: 20,
	},
	input: {
		marginBottom: '20px',
	},
});

type Category = {
	title: string;
	desc: string;
};

type Props = {
	handleSubmit: (category: Category) => void;
};

const CategoryForm: React.FC<Props> = ({handleSubmit}) => {
	const classes = useStyles();

	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (title.trim() && desc.trim()) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [title, desc]);

	useEffect(() => {
		validate();
	}, [validate]);

	const _handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setTitle(e.target.value);
	};

	const _handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setDesc(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const error: any = await handleSubmit({title, desc});

		setLoading(false);

		if (error) {
			enqueueSnackbar(error.msg, {variant: 'error'});

			return;
		}

		enqueueSnackbar('Category added');
		setTitle('');
		setDesc('');
	};

	const _handlePressKeyInput = (target: React.KeyboardEvent): void => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	const _handlePressKeyTextarea = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<div className='category-form'>
			<Typography variant='h5' className={classes.title}>
				Add category
			</Typography>
			<div className='form'>
				<TextField
					label='Title'
					value={title}
					className={classes.input}
					variant='outlined'
					onChange={_handleChangeTitle}
					onKeyPress={_handlePressKeyInput}
					disabled={loading}
					autoFocus
					error={title.length > 50}
				/>
				<TextField
					label='Description'
					value={desc}
					className={classes.input}
					variant='outlined'
					multiline
					rows='4'
					rowsMax='20'
					onChange={_handleChangeDesc}
					onKeyPress={_handlePressKeyTextarea}
					disabled={loading}
					error={desc.length > 3000}
				/>

				<ContainedButton loading={loading} disabled={disabledButton} onClick={_handleSubmit}>
					Submit
				</ContainedButton>
			</div>
		</div>
	);
};

export default CategoryForm;
