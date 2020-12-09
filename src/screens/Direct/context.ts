import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'DirectContext';

export default Context;
