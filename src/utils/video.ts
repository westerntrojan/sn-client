export const validateVideo = (file: File): {success: boolean; message?: string} => {
	const types = ['video/mp4', 'video/webm', 'video/ogg'];

	if (!types.includes(file.type)) {
		return {success: false, message: 'Invalid file type (only: mp4, webm, ogg)'};
	}

	if (file.size > 100 * 1024 * 1024) {
		return {success: false, message: 'Invalid file size (max: 100MB)'};
	}

	return {success: true};
};
