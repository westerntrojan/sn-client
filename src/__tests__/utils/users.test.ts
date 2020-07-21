import * as utils from '@utils/users';
import {defaultUser} from '@store/auth/types';

describe('Users Utils Test', () => {
	it(`${utils.userName.name} > 10`, () => {
		const user = {...defaultUser, firstName: 'Jack', lastName: 'Anderson'};

		const result = utils.userName(user);

		expect(result).toEqual(`${user.firstName} ${user.lastName}`.slice(0, 10) + '...');
	});

	it(`${utils.userLink.name} with username`, () => {
		const user = {...defaultUser, username: 'some-username'};

		const result = utils.userLink(user);

		expect(result).toEqual(`/user/${user.username}`);
	});

	it(`${utils.userInitials.name} with full name`, () => {
		const user = {...defaultUser, firstName: 'Jack', lastName: 'Anderson'};

		const result = utils.userInitials(user);

		expect(result).toEqual('JA');
	});
});
