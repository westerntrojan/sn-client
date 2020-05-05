export interface IArticleInputs {
	title: string;
	text: string;
	image: File | null;
	imagePreview: string;
	tags: string[];
	category: string;
}
