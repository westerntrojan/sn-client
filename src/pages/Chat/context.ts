import {createContext} from 'react';

export interface IContext {
	activeUsers: number;
	handleSubmitMessage: (message: any) => void;
}

const Context = createContext<any>(null);

Context.displayName = 'ChatContext';

export default Context;
