import React from 'react';
import Hotkeys from 'react-hot-keys';

type Props = {
	action: () => void;
};

const appKeys = {
	CHANGE_DRAWER: 'ctrl+b',
	EXIT: 'ctrl+q',
	SEARCH_FOCUS: '/',
	SUBMIT_MODAL: 'enter',
};

const chatKeys = {
	DELETE_MESSAGE: 'del',
};

export const ChangeDrawer: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={appKeys.CHANGE_DRAWER} onKeyUp={action} />;
};

export const SubmitModal: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={appKeys.SUBMIT_MODAL} onKeyUp={action} />;
};

export const Exit: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={appKeys.EXIT} onKeyUp={action} />;
};

export const SearchFocus: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={appKeys.SEARCH_FOCUS} onKeyUp={action} />;
};

export const RemoveMessage: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={chatKeys.DELETE_MESSAGE} onKeyUp={action} />;
};
