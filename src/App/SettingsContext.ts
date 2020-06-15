import {createContext} from 'react';

const SettingsContext = createContext<any>(null);

SettingsContext.displayName = 'SettingsContext';

export default SettingsContext;
