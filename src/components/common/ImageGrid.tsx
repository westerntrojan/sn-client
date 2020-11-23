import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ImageModal from '@components/common/modals/ImageModal';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: '100%',
	},
	img: {
		cursor: 'pointer',
	},
}));

type Props = {
	images: string[];
	title?: string;
};

const ImageGrid: React.FC<Props> = ({images, title = 'img'}) => {
	const classes = useStyles();

	const [imageModal, setImageModal] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const [gridItems, setGridItems] = useState<{img: string; cols: number}[]>([]);
	const [gridOptions, setGridOptions] = useState({
		cellHeight: 400,
		cols: 1,
	});

	useEffect(() => {
		switch (images.length) {
			case 1:
				setGridOptions({
					cellHeight: 400,
					cols: 1,
				});
				setGridItems(images.map(image => ({img: image, cols: 1})));
				break;
			case 2:
				setGridOptions({
					cellHeight: 200,
					cols: 1,
				});
				setGridItems(images.map(image => ({img: image, cols: 1})));
				break;
			case 3:
				setGridOptions({
					cellHeight: 200,
					cols: 2,
				});
				setGridItems(images.map((image, index) => ({img: image, cols: index === 0 ? 2 : 1})));
				break;
			case 4:
				setGridOptions({
					cellHeight: 200,
					cols: 3,
				});
				setGridItems(images.map((image, index) => ({img: image, cols: index === 0 ? 3 : 1})));
				break;
			case 5:
				setGridOptions({
					cellHeight: 200,
					cols: 3,
				});
				setGridItems(images.map((image, index) => ({img: image, cols: index === 0 ? 2 : 1})));
				break;
		}
	}, [images]);

	const openImageModal = (currentImage: number): void => {
		setCurrentImage(currentImage);

		setImageModal(true);
	};

	return (
		<div className={classes.root}>
			<GridList
				cellHeight={gridOptions.cellHeight}
				cols={gridOptions.cols}
				className={classes.gridList}
			>
				{gridItems.map((item, index) => (
					<GridListTile
						key={item.img}
						cols={item.cols || 1}
						onClick={(): void => openImageModal(index)}
					>
						<img src={item.img} alt={title} className={classes.img} />
					</GridListTile>
				))}
			</GridList>

			<ImageModal
				open={imageModal}
				closeModal={(): void => setImageModal(false)}
				currentImage={currentImage}
				images={images}
			/>
		</div>
	);
};

export default ImageGrid;
