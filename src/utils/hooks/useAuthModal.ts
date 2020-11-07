import {useDispatch} from 'react-redux';

import {openAuthModal} from '@store/app/actions';

type ReturningData = {
	openAuthModal: () => void;
};

export default (): ReturningData => {
	const dispatch = useDispatch();

	return {
		openAuthModal(): void {
			dispatch(openAuthModal());
		},
	};
};
