import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'ChatContext';

export default Context;
