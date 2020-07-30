import {openDB, IDBPDatabase} from 'idb';

const defaultSettings = [
	{name: 'enable_animations', value: true},
	{name: 'two_factor_auth', value: false},
];

const setup = async (): Promise<IDBPDatabase> => {
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

type Param = {
	name: string;
	value: boolean | string;
};

class Settings {
	private readonly _db: IDBPDatabase;

	constructor(db: IDBPDatabase) {
		this._db = db;
	}

	public async get(name: string): Promise<boolean | string> {
		const param = await this._db.get('settings', name);

		return param.value;
	}

	public async put({name, value}: Param): Promise<void> {
		await this._db.put('settings', {
			name,
			value,
		});
	}
}

export default Settings;
