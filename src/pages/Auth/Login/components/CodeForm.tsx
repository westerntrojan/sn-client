import React, {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import {useSnackbar} from 'notistack';

import Context from '@pages/Auth/context';

const useStyles = makeStyles({
	input: {
		marginBottom: 20,
	},
});

const CodeForm: React.FC = () => {
	const classes = useStyles();

	const [code, setCode] = useState('');

	const {submitCode} = useContext(Context);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCode(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (!code.trim()) {
			return;
		}

		const data = await submitCode(code);

		if (!data.success) {
			enqueueSnackbar(data.message, {variant: 'error'});
		}
	};

	const _handleKeyPress = (e: React.KeyboardEvent): void => {
		if (e.key === 'Enter') {
			_handleSubmit();
		}
	};

	return (
		<div className='code-form'>
			<div className='form'>
				<TextField
					className={classes.input}
					label='6 digit code'
					value={code}
					variant='outlined'
					onChange={_handleChangeCode}
					onKeyPress={_handleKeyPress}
				/>

				<Button variant='contained' color='primary' onClick={_handleSubmit} fullWidth>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default CodeForm;
