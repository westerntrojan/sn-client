import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import {getCurrentTheme} from '@utils/app';

const useStyles = makeStyles({
	root: {},
	slider: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
});

type Props = {
	handleChangeTheme: ({fontSize}: {fontSize: number}) => void;
};

const FontSizeSlider: React.FC<Props> = ({handleChangeTheme}) => {
	const classes = useStyles();

	const getDefaultValue = (): number => {
		const currentTheme = getCurrentTheme();

		switch (currentTheme.typography.fontSize) {
			case 13:
				return 0;
			case 14:
				return 25;
			case 15:
				return 50;
			case 16:
				return 75;
			case 17:
				return 1000;
		}

		return 50;
	};

	const [sliderValue, setSliderValue] = useState(getDefaultValue());

	const _handleChange = (event: React.ChangeEvent<{}>, value: number | number[]): void => {
		switch (value) {
			case 0:
				setSliderValue(value);
				handleChangeTheme({fontSize: 13});
				break;
			case 25:
				setSliderValue(value);
				handleChangeTheme({fontSize: 14});
				break;
			case 50:
				setSliderValue(value);
				handleChangeTheme({fontSize: 15});
				break;
			case 75:
				setSliderValue(value);
				handleChangeTheme({fontSize: 16});
				break;
			case 100:
				setSliderValue(value);
				handleChangeTheme({fontSize: 17});
				break;
		}
	};

	return (
		<div className={classes.root}>
			<Typography color='primary' style={{marginBottom: 10}}>
				Font size
			</Typography>

			<div className={classes.slider}>
				<Typography style={{fontSize: 13}}>Aa</Typography>

				<Slider
					step={25}
					value={sliderValue}
					onChangeCommitted={_handleChange}
					style={{margin: '0 20px'}}
					marks
				/>

				<Typography style={{fontSize: 17}}>Aa</Typography>
			</div>
		</div>
	);
};

export default FontSizeSlider;
