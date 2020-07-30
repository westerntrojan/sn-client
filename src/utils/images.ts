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

type ImageOptions = {
	quality?: number;
	width?: number;
	height?: number;
};

export const getImage = (public_id: string, {quality, width, height}: ImageOptions): string => {
	const url = `${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65,fl_progressive/${public_id}`;

	return url;
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
