import {useDispatch} from 'react-redux';

import {openAuthModal} from '@/store/app/actions';

type ReturningData = {
	openAuthModal: () => void;
};

function useAuthModal(): ReturningData {
	const dispatch = useDispatch();

	return {
		openAuthModal() {
			dispatch(openAuthModal());
		},
	};
}

export default useAuthModal;
