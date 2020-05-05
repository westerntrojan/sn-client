import {createContext} from 'react';

import {IUser} from '@store/types';

export interface IContext {
	typing: boolean;
	user: IUser;
	openClearHistoryModal: () => void;
	handleSubmitMessage: (text: string) => void;
	handleTyping: () => void;
	handleTypingEnd: () => void;
}

const Context = createContext<any>(null);

Context.displayName = 'UsersChatContext';

export default Context;
