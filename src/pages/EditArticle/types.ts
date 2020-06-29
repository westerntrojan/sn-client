export interface IArticleInputs {
	title: string;
	text: string;
	imageFile: File | null;
	imagePreview: string;
	tags: string[];
	category: string;
}
