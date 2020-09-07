import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import './ErrorBoundary.scss';
import {handleAppError} from '@utils/errorHandlers';
import {RootState} from '@store/types';

type Props = {
	error: object;
	children: React.ReactNode;
};

class ErrorBoundary extends Component<Props> {
	componentDidCatch(error: Error, errorInfo: object): void {
		handleAppError(error);
	}

	render(): React.ReactNode {
		if (this.props.error) {
			return (
				<section className='error-boundary'>
					<Helmet>
						<title>Error</title>
					</Helmet>

					<Paper className='paper'>
						<Typography variant='h1' className='message'>
							Error
						</Typography>
					</Paper>
				</section>
			);
		}

		return this.props.children;
	}
}

const mapStateToProps = (state: RootState): {error: any} => ({
	error: state.app.error,
});

export default connect(mapStateToProps)(ErrorBoundary);
