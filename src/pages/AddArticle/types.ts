export interface IArticleInputs {
	title: string;
	text: string;
	image: File | null;
	tags: string[];
	category: string;
}
