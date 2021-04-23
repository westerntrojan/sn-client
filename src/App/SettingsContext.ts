import {createContext} from 'react';

type ContextValue = {
	handleChangeTwoFactorAuth: () => void;
	handleChangeThemeAnimations: () => void;
};

const SettingsContext = createContext({} as ContextValue);

SettingsContext.displayName = 'SettingsContext';

export default SettingsContext;
