import $ from 'jquery';
import {View} from 'backbone';
import Photos from '../collections/photos';
import Gallery from './gallery';
import Header from './header';

class AppView extends View {
	constructor() {
		super();
		this.setElement('body');
	}

	render() {
		const photos = new Photos(),
					gallery = new Gallery(photos),
					header = new Header(photos);
		this.$('#app').html(gallery.el);
		$('.loader').delay(300).addClass('loader--collapsed');
	}
}

export default AppView;
