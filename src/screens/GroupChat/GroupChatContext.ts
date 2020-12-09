import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'GroupChatContext';

export default Context;
