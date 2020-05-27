import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
	imageWrapper: {
		maxWidth: 300,
		marginBottom: 20,

		[theme.breakpoints.down('xs')]: {
			maxWidth: '100%',
		},
	},
	image: {
		width: '100%',
		height: '100%',
	},
	modeButtons: {
		marginBottom: 20,
	},
	input: {
		marginBottom: 20,
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	firstButton: {
		marginRight: 10,
	},
}));

type Props = {
	open: boolean;
	imagePreview: string;
	handleSubmit: (object: any) => void;
	closeModal: () => void;
};

const ImageModal: React.FC<Props> = ({open, imagePreview, handleSubmit, closeModal}) => {
	const classes = useStyles();

	const [mode, setMode] = React.useState('as_photo');
	const [caption, setCaption] = useState('');

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const _handleSubmit = (): void => {
		if (caption) {
			handleSubmit({type: 'image_caption', caption});

			setMode('as_photo');
			setCaption('');

			closeModal();
		} else {
			handleSubmit({type: 'image'});

			setMode('as_photo');
			setCaption('');

			closeModal();
		}
	};

	const _handleChangeMode = (e: any): void => {
		setMode(e.target.value);
	};

	const _handleChangeCaption = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCaption(e.target.value);
	};

	const _handlePressKeyTextarea = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen}>
			<DialogContent>
				<div className={classes.imageWrapper}>
					<img src={imagePreview} alt='' className={classes.image} />
				</div>

				<div className={classes.modeButtons}>
					<FormControl component='fieldset'>
						<RadioGroup value={mode} onChange={_handleChangeMode}>
							<FormControlLabel
								value='as_photo'
								control={<Radio color='primary' />}
								label='Send as photo'
							/>
							<FormControlLabel
								value='as_file'
								control={<Radio color='primary' />}
								label='Send as file'
							/>
						</RadioGroup>
					</FormControl>
				</div>

				<TextField
					label='Caption'
					value={caption}
					className={classes.input}
					onChange={_handleChangeCaption}
					onKeyPress={_handlePressKeyTextarea}
					autoFocus
					rowsMax={3}
					multiline
					fullWidth
				/>

				<div className={classes.buttons}>
					<Button color='primary' className={classes.firstButton} onClick={closeModal}>
						Cancel
					</Button>
					<Button color='primary' onClick={_handleSubmit}>
						Submit
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ImageModal;
