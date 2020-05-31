export interface ISendingMessage {
	type: 'text' | 'image' | 'image_caption';
	image: File | null;
	text: string;
	caption: string;
}
