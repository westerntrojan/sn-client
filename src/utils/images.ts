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
