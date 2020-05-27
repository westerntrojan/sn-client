import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'AppContext';

export default Context;
