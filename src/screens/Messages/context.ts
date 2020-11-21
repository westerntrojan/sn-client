import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'MessagesContext';

export default Context;
