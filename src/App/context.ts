import {createContext} from 'react';

import {IArticle} from '@store/types';

export interface IContext {
	topTags: string[];
	topArticles: IArticle[];
	loading: boolean;
}

const Context = createContext<any>(null);

Context.displayName = 'ChatContext';

export default Context;
