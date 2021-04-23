import {openDB, IDBPDatabase} from 'idb';

const defaultSettings = [
	{name: 'enable_animations', value: true},
	{name: 'two_factor_auth', value: false},
	{name: 'sending_message_key', value: 'enter'},
];

const init = async (): Promise<IDBPDatabase> => {
	const db = await openDB('delo', 1, {
		upgrade(db) {
			const store = db.createObjectStore('settings', {keyPath: 'name'});

			store.createIndex('name', 'name', {unique: true});
		},
	});

	const item = await db.get('settings', defaultSettings[0].name);

	if (!item) {
		const tx = db.transaction('settings', 'readwrite');

		await Promise.all(
			defaultSettings.map(async item => {
				tx.store.add(item);
			}),
		);
	}

	return db;
};

type SettingsItem = {
	name: string;
	value: any;
};

type ReturningData = {
	getItem: (name: string) => Promise<string | null>;
	updateItem: (name: string, value: any) => Promise<boolean>;
};

function useSettings(): ReturningData {
	const getItem = async (name: string): Promise<string | null> => {
		const db = await init();

		const item = await db.get('settings', name);

		if (!item) {
			return null;
		}

		return item.value;
	};
	const updateItem = async (name: string, value: any): Promise<boolean> => {
		const db = await init();

		const item = await getItem(name);

		if (!item) {
			return false;
		}

		await db.put('settings', {name, value});

		return true;
	};

	return {getItem, updateItem};
}

export default useSettings;
