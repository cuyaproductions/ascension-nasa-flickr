import $ from 'jquery';
import {View} from 'backbone';
import Photos from '../collections/photos';
import Thumbnail from './thumbnail';

class Gallery extends View {
	constructor() {
		super({
			className: 'gallery',
			tagName: 'ul'
		});

		this.model = new Photos();
		this.listenTo(this.model, 'sync', this.render);
		this.render();
	}

	render() {
		this.$el.html('');
		this.model.each(this.addPhoto, this);
		$('body').html(this.$el);
	}

	addPhoto(model) {
		const thumbnail = new Thumbnail(model);
		this.$el.append(thumbnail.$el);		
	}
}

export default Gallery;
