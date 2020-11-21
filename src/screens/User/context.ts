import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'UserContext';

export default Context;
