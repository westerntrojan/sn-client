import React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
	query: string;
	handleSearch: (text: string) => void;
};

const Header: React.FC<Props> = ({query, handleSearch}) => {
	return (
		<div>
			<TextField
				value={query}
				label='Search'
				type='search'
				variant='filled'
				fullWidth
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
			/>
		</div>
	);
};

export default Header;
