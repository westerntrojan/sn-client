import React, {useState, useEffect, useCallback, useRef} from 'react';
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

import MediaUploader from './MediaUploader';
import AudioUploader from './AudioUploader';
import {RootState, IAudioTrack} from '@store/types';
import {IArticleInputs} from '@screens/AddArticle/types';
import {BackdropLoader} from '@components/common/loaders';

const useStyles = makeStyles({
	input: {
		marginBottom: '20px',
		position: 'relative',
	},
});

type Props = {
	handleSubmit: (article: IArticleInputs) => void;
};

const Form: React.FC<Props> = ({handleSubmit}) => {
	const classes = useStyles();

	const allCategory = useSelector((state: RootState) => state.category.all, shallowEqual);

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [category, setCategory] = useState(allCategory[0]._id);
	const [loading, setLoading] = useState(false);
	const [disabledButton, setDisabledButton] = useState(true);
	const [images, setImages] = useState<string[]>([]);
	const [video, setVideo] = useState('');
	const [audio, setAudio] = useState<IAudioTrack[]>([]);
	const [loadingMedia, setLoadingMedia] = useState(false);

	const inputLabelRef = useRef<HTMLLabelElement>(null);
	const [labelWidth, setLabelWidth] = useState(0);

	const {enqueueSnackbar} = useSnackbar();

	const validate = useCallback(() => {
		if (title.trim() && text.trim() && !loadingMedia) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [title, text, loadingMedia]);

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

		const data: any = await handleSubmit({title, text, category, tags, images, video, audio});

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
		<div className='form'>
			<TextField
				label='Title'
				value={title}
				className={classes.input}
				variant='outlined'
				onChange={_handleChangeTitle}
				onKeyPress={_handleKeyPressInput}
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
				error={text.length > 5000}
			/>

			<MediaUploader
				onUploadImages={(images: string[]) => setImages(images)}
				// onRemoveImage={() => setImage('')}
				onUploadVideo={(video: string) => setVideo(video)}
				onRemoveVideo={() => setVideo('')}
				onLoadingStart={() => setLoadingMedia(true)}
				onLoadingFinish={() => setLoadingMedia(false)}
			/>

			<AudioUploader
				onUploadAudio={(audioTrack: IAudioTrack) => setAudio(audio.concat(audioTrack))}
				onRemoveAudio={(filename: string) =>
					setAudio(audio.filter(audioTrack => audioTrack.filename !== filename))
				}
				onLoadingStart={() => setLoadingMedia(true)}
				onLoadingFinish={() => setLoadingMedia(false)}
			/>

			<ChipInput
				label='Tags'
				variant='outlined'
				className={classes.input}
				value={tags}
				onAdd={_handleAddTag}
				onDelete={_handleRemoveTag}
				onKeyPress={_handleKeyPressTextarea}
			/>
			<FormControl variant='outlined' className={classes.input}>
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
				disabled={disabledButton || loadingMedia}
				onClick={_handleSubmit}
			>
				Submit
			</Button>

			<BackdropLoader open={loading} />
		</div>
	);
};

export default Form;
