const lead0 = (n1: number, n2: number): string => {
	let nz = '' + n1;

	while (nz.length < n2) {
		nz = '0' + nz;
	}

	return nz;
};

// time - duration in seconds
export const formatTime = (time: number, hours: boolean): string => {
	if (hours) {
		const h = Math.floor(time / 3600);
		// eslint-disable-next-line
		time = time - h * 3600;

		const m = Math.floor(time / 60);
		const s = Math.floor(time % 60);

		return lead0(h, 2) + ':' + lead0(m, 2) + ':' + lead0(s, 2);
	} else {
		const m = Math.floor(time / 60);
		const s = Math.floor(time % 60);

		return lead0(m, 2) + ':' + lead0(s, 2);
	}
};
