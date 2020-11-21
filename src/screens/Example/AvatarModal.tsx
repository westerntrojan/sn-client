import React, {useState, useRef} from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slider from '@material-ui/core/Slider';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import {SubmitModal} from '@utils/hotKeys';

const useStyles = makeStyles({
	slider: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
});

type Props = {
	open: boolean;
	closeModal: () => void;
};

const AvatarModal: React.FC<Props> = ({open, closeModal}) => {
	const classes = useStyles();

	const [zoom, setZoom] = useState(1);

	const editorRef = useRef<AvatarEditor | null>(null);

	const _handleChangeZoom = (event: any, newValue: number | number[]): void => {
		setZoom(newValue as number);
	};

	const getCroppingRect = (): void => {
		if (editorRef.current) {
			console.log(editorRef.current.getCroppingRect());
		}
	};

	return (
		<Dialog open={open} onClose={closeModal} fullWidth>
			<DialogTitle>Avatar editor</DialogTitle>

			<DialogContent
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<AvatarEditor
					image='https://res.cloudinary.com/di1kptduj/image/upload/v1605869756/test/or9cyhiutmpzzrfodygb.jpg'
					width={500}
					height={500}
					border={50}
					color={[255, 255, 255, 0.6]} // RGBA
					scale={zoom}
					rotate={0}
					style={{
						marginBottom: 20,
					}}
					ref={editorRef}
				/>

				<div className={classes.slider}>
					<ZoomOutIcon />
					<Slider
						value={zoom}
						onChange={_handleChangeZoom}
						step={0.1}
						min={1}
						max={3}
						style={{
							margin: '0 20px',
						}}
					/>
					<ZoomInIcon />
				</div>
			</DialogContent>

			<DialogActions>
				<Button onClick={closeModal} color='primary'>
					Cancel
				</Button>

				<Button color='primary' onClick={getCroppingRect}>
					Apply
				</Button>
			</DialogActions>

			<SubmitModal action={getCroppingRect} />
		</Dialog>
	);
};

export default AvatarModal;
