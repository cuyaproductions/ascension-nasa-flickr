import $ from 'jquery';
import {View} from 'backbone';
import Photos from '../collections/photos';
import Thumbnail from './thumbnail';

class Gallery extends View {
	constructor() {
		super({
			events: {
				'click #more': 'loadMore'
			},
			className: 'gallery',
			tagName: 'ul'
		});

		this.model = new Photos();
		this.listenTo(this.model, 'photos:ready', this.render);
		this.more = true;

	}

	render() {
		this.$el.html('');
		this.model.each(this.addPhoto, this);
		$('body').append(this.$el);
		this.infiniteScroll();
	}

	addPhoto(model) {
		const thumbnail = new Thumbnail(model);
		this.$el.append(thumbnail.$el);		
	}


	infiniteScroll() {
		const me = this;
		function loadMore() {
			const height = window.innerHeight,
						bottom = document.body.getClientRects()[0].bottom;
			if (height >= bottom) {
				me.model.loadMore();
				window.removeEventListener('scroll', loadMore);
			}
		}

		window.addEventListener('scroll', loadMore);
	}
}

export default Gallery;
