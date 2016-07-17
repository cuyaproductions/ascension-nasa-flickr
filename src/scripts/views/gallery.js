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
		this.listenTo(this.model, 'sync', this.render);
	}



	render() {
		this.$el.html('');
		this.model.each(this.addPhoto, this);
		$('body').html('').append(this.el).append($(this.loader()));
		this.infiniteScroll();
	}

	addPhoto(model) {
		const thumbnail = new Thumbnail(model);
		this.$el.append(thumbnail.el);		
	}


	infiniteScroll() {
		const me = this;
		function loadMore() {
			const height = window.innerHeight,
						bottom = document.body.getClientRects()[0].bottom;
			if (height + 50 >= bottom) {
				me.model.loadMore();
				window.removeEventListener('scroll', loadMore);
			}
		}

		window.addEventListener('scroll', loadMore);
	}

	loader() {
		return '<div class="loader"><svg class="loader__image" xmlns="http://www.w3.org/2000/svg" width="123.9" height="123.9" viewBox="0 0 123.9 123.9"> <circle class="loader__planet" class="st0" cx="61.9" cy="61.9" r="36"/> <g class="loader__spinner"> <path class="loader__orbit" d="M118 50.5C113 24.7 90 5.2 62.6 5.2 31.2 5.2 5.8 30.6 5.8 62s25.4 56.6 56.7 56.6c27.4 0 50.3-19.4 55.5-45.3"/> <circle class="loader__astro" cx="118.6" cy="61.9" r="5.2"/> <circle class="loader__spacer" cx="61.9" cy="61.9" r="61.9"/> </g> </svg></div>';
	}
}

export default Gallery;
