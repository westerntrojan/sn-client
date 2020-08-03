import {IAudioTrack} from '@store/types';

export interface IArticleInputs {
	title: string;
	text: string;
	image: string;
	video: string;
	audio: IAudioTrack[];
	tags: string[];
	category: string;
}
