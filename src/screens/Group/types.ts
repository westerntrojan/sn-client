export interface IGroup {
	_id: string;
	name: string;
	avatar: {
		color: string;
		image: string;
	};
	members: string[];
}
