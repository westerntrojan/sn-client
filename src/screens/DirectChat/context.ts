import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'DirectChatContext';

export default Context;
