import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '@/store/types';

function useAuth() {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	return auth.isAuth;
}

export default useAuth;
