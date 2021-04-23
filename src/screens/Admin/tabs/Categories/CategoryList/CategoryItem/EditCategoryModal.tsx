import React, {useState, useCallback, useEffect, useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';

import {ICategory} from '@/store/types';
import Context from '@/screens/Admin/tabs/Categories/context';

const useStyles = makeStyles({
	input: {
		marginBottom: 20,
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
	},
});

type Props = {
	open: boolean;
	closeModal: () => void;
	category: ICategory;
};

const EditCategoryModal: React.FC<Props> = ({open, closeModal, category}) => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [title, setTitle] = useState(category.title);
	const [desc, setDesc] = useState(category.desc);
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);

	const {handleEditCategory} = useContext(Context);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (title.trim() && desc.trim() && (title !== category.title || desc !== category.desc)) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [title, desc, category]);

	useEffect(() => {
		validate();
	}, [validate]);

	const _handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const _handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDesc(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (disabledButton) {
			return;
		}

		setLoading(true);

		const data = await handleEditCategory({...category, title, desc});

		if (data.success) {
			enqueueSnackbar('Category updated', {variant: 'success'});

			closeModal();
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
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
		<Dialog
			open={open}
			onClose={!loading ? closeModal : undefined}
			aria-labelledby='form-dialog-title'
			fullScreen={fullScreen}
			fullWidth
		>
			<DialogTitle>Edit category</DialogTitle>

			<DialogContent className={classes.content}>
				<TextField
					label='Title'
					value={title}
					className={classes.input}
					variant='outlined'
					onChange={_handleChangeTitle}
					onKeyPress={_handleKeyPressInput}
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
					onKeyPress={_handleKeyPressTextarea}
					disabled={loading}
					error={desc.length > 3000}
				/>
			</DialogContent>
			<DialogActions>
				<Button color='primary' onClick={closeModal} disabled={loading}>
					Cancel
				</Button>
				<Button
					color='primary'
					variant='contained'
					disabled={disabledButton || loading}
					onClick={_handleSubmit}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditCategoryModal;
