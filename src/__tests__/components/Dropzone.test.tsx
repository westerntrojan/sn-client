import React from 'react';
import {shallow} from 'enzyme';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

import Dropzone from '@components/common/Dropzone';
import Loader from '@components/common/loaders/Loader';

describe(`${Dropzone.name} Component Test`, () => {
	it(`${Dropzone.name} match snapshot`, () => {
		const props = {
			imagePreview: '',
			loadingImage: false,
			handleChangeImage: () => {},
			handleRemoveImage: () => {},
		};
		const component = shallow(<Dropzone {...props} />);

		expect(component).toMatchSnapshot();
	});

	it(`${Dropzone.name} without imagePreview prop`, () => {
		const props = {
			imagePreview: '',
			loadingImage: false,
			handleChangeImage: jest.fn(),
			handleRemoveImage: () => {},
		};
		const component = shallow(<Dropzone {...props} />);

		expect(component.find(Button)).toHaveLength(1);
		expect(component.find(Button).text()).toEqual('Upload image');

		const changeEvent = {
			target: {
				value: 'some-image-url',
			},
		};
		component.find('input').simulate('change', changeEvent);
		expect(props.handleChangeImage).toHaveBeenCalledTimes(1);
		expect(props.handleChangeImage).toHaveBeenCalledWith(changeEvent);
	});

	it(`${Dropzone.name} with imagePreview prop`, () => {
		const props = {
			imagePreview: 'some-image',
			loadingImage: false,
			handleChangeImage: () => {},
			handleRemoveImage: jest.fn(),
		};
		const component = shallow(<Dropzone {...props} />);

		expect(component.find(Button)).toHaveLength(1);
		expect(component.find(Button).text()).toEqual('Remove image');

		expect(component.find(CardActionArea)).toHaveLength(1);
		expect(component.find(CardActionArea).prop('disabled')).toEqual(false);

		component.find(Button).simulate('click');
		expect(props.handleRemoveImage).toHaveBeenCalledTimes(1);
	});

	it(`${Dropzone.name} with loadingImage`, () => {
		const props = {
			imagePreview: 'some-image',
			loadingImage: true,
			handleChangeImage: () => {},
			handleRemoveImage: () => {},
		};
		const component = shallow(<Dropzone {...props} />);

		expect(component.find(Loader)).toHaveLength(1);
		expect(component.find(CardActionArea).prop('disabled')).toEqual(true);
	});
});
