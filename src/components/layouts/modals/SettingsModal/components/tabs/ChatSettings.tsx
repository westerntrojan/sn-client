import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
	title: {
		marginBottom: 10,
	},
});

const ChatSettings: React.FC = () => {
	const classes = useStyles();

	const [sendingkey, setSendingKey] = useState('enter');

	const _handleChangeSendingVariant = (e: any): void => {
		setSendingKey(e.target.value);
	};

	return (
		<div>
			<Typography color='primary' className={classes.title}>
				Messages
			</Typography>
			<FormControl component='fieldset'>
				<RadioGroup value={sendingkey} onChange={_handleChangeSendingVariant}>
					<FormControlLabel
						value='enter'
						control={<Radio color='primary' />}
						label='Send with Enter'
					/>
					<FormControlLabel
						value='ctrl_enter'
						control={<Radio color='primary' />}
						label='Send with Ctrl+Enter'
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default ChatSettings;
