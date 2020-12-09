import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'CanvasContext';

export default Context;
