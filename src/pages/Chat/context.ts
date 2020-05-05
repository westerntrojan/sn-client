import {createContext} from 'react';

export interface IContext {
	activeUsers: number;
	handleSubmitMessage: (text: string) => void;
}

const Context = createContext<any>(null);

Context.displayName = 'ChatContext';

export default Context;
