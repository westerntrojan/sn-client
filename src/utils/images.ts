export const validateImage = (file: File): {success: boolean; message?: string} => {
	const types = ['image/jpg', 'image/jpeg', 'image/png'];

	if (!types.includes(file.type)) {
		return {success: false, message: 'Invalid file type (only: jpg, jpeg, png)'};
	}

	if (file.size > 5 * 1024 * 1024) {
		return {success: false, message: 'Invalid file size (max: 5MB)'};
	}

	return {success: true};
};

type ImageOptions = {
	quality?: number;
	width?: number;
	height?: number;
};

export const getImage = (public_id: string, {quality, width, height}: ImageOptions): string => {
	const url = `${process.env.REACT_APP_CLOUD_URI}/q_65,fl_progressive/${public_id}`;

	return url;
};
