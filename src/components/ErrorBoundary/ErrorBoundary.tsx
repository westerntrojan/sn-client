import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from '@material-ui/styles';
import lottie from 'lottie-web';

import './ErrorBoundary.scss';
import {handleAppError} from '@utils/errorHandlers';
import {RootState} from '@store/types';
import {getCurrentTheme} from '@utils/app';

type Props = {
	error: object;
	children: React.ReactNode;
};

class ErrorBoundary extends Component<Props> {
	private animationRef: React.RefObject<HTMLDivElement>;

	constructor(props: Props) {
		super(props);

		this.animationRef = React.createRef();
	}

	componentDidMount(): void {
		if (this.animationRef.current) {
			lottie.loadAnimation({
				container: this.animationRef.current,
				renderer: 'svg',
				loop: false,
				autoplay: true,
				path: '/lottie-animations/error.json',
			});
		}
	}

	componentDidCatch(error: Error, errorInfo: object): void {
		handleAppError(error);
	}

	render(): React.ReactNode {
		if (this.props.error) {
			return (
				<ThemeProvider theme={getCurrentTheme()}>
					<section className='error-boundary'>
						<Helmet>
							<title>Error</title>
						</Helmet>

						<Paper className='paper'>
							{/* <Typography variant='h1' className='message'>
								Error
							</Typography> */}

							<div ref={this.animationRef}></div>
						</Paper>
					</section>
				</ThemeProvider>
			);
		}

		return this.props.children;
	}
}

const mapStateToProps = (state: RootState): {error: any} => ({
	error: state.app.error,
});

export default connect(mapStateToProps)(ErrorBoundary);
