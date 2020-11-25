import {createContext} from 'react';

const Context = createContext<any>(null);

Context.displayName = 'CategoriesContext';

export default Context;
