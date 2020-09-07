export const validateImage = (file: File): {success: boolean; message?: string} => {
	const types = ['image/jpg', 'image/jpeg', 'image/png'];

	if (!types.includes(file.type)) {
		return {success: false, message: 'Invalid file type (only: jpg, jpeg, png)'};
	}

	if (file.size > 10 * 1024 * 1024) {
		return {success: false, message: 'Invalid file size (max: 10MB)'};
	}

	return {success: true};
};

export const downloadImage = async (imageUrl: string): Promise<void> => {
	const response = await fetch(imageUrl);

	const blob = await response.blob();

	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = '';
	a.click();
};
