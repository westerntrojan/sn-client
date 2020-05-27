import {useHistory, useLocation} from 'react-router';

type ReturningData = (pathname: string) => void;

export default (): ReturningData => {
	const history = useHistory();
	const location = useLocation();

	const redirect = (pathname: string): void => {
		return history.push({
			pathname,
			state: {from: location},
		});
	};

	return redirect;
};
