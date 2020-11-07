import {useHistory, useLocation} from 'react-router';

type ReturningData = {
	redirectTo: (pathname: string) => void;
};

export default (): ReturningData => {
	const history = useHistory();
	const location = useLocation();

	return {
		redirectTo(pathname: string): void {
			return history.push({
				pathname,
				state: {from: location},
			});
		},
	};
};
