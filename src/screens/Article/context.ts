import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'ArticleContext';

export default Context;
