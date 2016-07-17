import $ from 'jquery';
import {View} from 'backbone';
import Thumbnail from './thumbnail';

class Gallery extends View {
	constructor(model) {
		super();
		this.model = model;
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model, 'reset', this.reset);
	}

	className() {
		return 'gallery';
	}
	tagName() {
		return 'ul';
	}

	render() {
		this.$el.html('');
		this.model.each(this.addPhoto, this);
		if(!this.model.isReset) {
			this.infiniteScroll();
		} else {
			this.model.isReset = false;
		}
		return this;
	}

	addPhoto(model) {
		const thumbnail = new Thumbnail(model);
		this.$el.append(thumbnail.el);		
	}

	reset() {
		document.body.scrollTop = 0;
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
}

export default Gallery;
