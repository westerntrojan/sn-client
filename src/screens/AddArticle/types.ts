import {IAudioTrack} from '@store/types';

export interface IArticleInputs {
	title: string;
	text: string;
	images: string[];
	video: string;
	audio: IAudioTrack[];
	tags: string[];
	category: string;
}
