import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'AuthModalContext';

export default Context;
