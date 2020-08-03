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
