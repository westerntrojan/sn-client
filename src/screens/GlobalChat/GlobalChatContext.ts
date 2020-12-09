import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'GlobalChatContext';

export default Context;
