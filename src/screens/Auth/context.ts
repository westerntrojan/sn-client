import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'AuthContext';

export default Context;
