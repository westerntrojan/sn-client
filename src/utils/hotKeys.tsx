import React from 'react';
import Hotkeys from 'react-hot-keys';

type Props = {
	action: () => void;
};

const keys = {
	CHANGE_DRAWER: 'ctrl+b',
	EXIT: 'ctrl+q',
	SEARCH_FOCUS: '/',
	SUBMIT_MODAL: 'enter',
	CLOSE: 'esc',
	REMOVE_MESSAGE: 'del',
};

export const ChangeDrawer: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={keys.CHANGE_DRAWER} onKeyUp={action} />;
};

export const SubmitModal: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={keys.SUBMIT_MODAL} onKeyUp={action} />;
};

export const Exit: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={keys.EXIT} onKeyUp={action} />;
};

export const SearchFocus: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={keys.SEARCH_FOCUS} onKeyUp={action} />;
};

export const RemoveMessage: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={keys.REMOVE_MESSAGE} onKeyUp={action} />;
};

export const Close: React.FC<Props> = ({action}) => {
	return <Hotkeys keyName={keys.CLOSE} onKeyUp={action} />;
};
