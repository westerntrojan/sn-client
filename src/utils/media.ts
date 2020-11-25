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

export const validateAudio = (file: File): {success: boolean; message?: string} => {
	const types = ['audio/aac', 'audio/mp3', 'audio/ogg', 'audio/flac', 'audio/mpeg'];

	if (!types.includes(file.type)) {
		return {success: false, message: 'Invalid file type (only: aac, mp3, ogg, flac)'};
	}

	if (file.size > 100 * 1024 * 1024) {
		return {success: false, message: 'Invalid file size (max: 100MB)'};
	}

	return {success: true};
};
