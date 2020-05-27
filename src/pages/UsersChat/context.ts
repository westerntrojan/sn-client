import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'UsersChatContext';

export default Context;
