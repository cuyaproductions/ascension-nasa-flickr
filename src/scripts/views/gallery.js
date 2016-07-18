import $ from 'jquery';
import {View} from 'backbone';
import Thumbnail from './thumbnail';

class Gallery extends View {
	constructor(options) {
		super(options);
		this.scrollActive = false;
		this.isActive = true;
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

		this.infiniteScroll(); 

		$('.loader').show().addClass('loader--collapsed');	
		if(this.model.noMore) {
			$('.loader').addClass('loader--nomore');
		} else {
			$('.loader').removeClass('loader--nomore');
		}

		return this;
	}

	addPhoto(model) {
		const thumbnail = new Thumbnail(model).render();
		this.$el.append(thumbnail.el);		
	}

	reset() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}


	infiniteScroll() {
		console.log(this.isActive);
		const me = this;
		function loadMore() {
			const height = window.innerHeight,
						bottom = document.body.getClientRects()[0].bottom;
			if (height + 50 >= bottom && !me.model.noMore) {
				me.model.loadMore();
				console.log('remove listener');
				window.removeEventListener('scroll', loadMore);
				me.scrollActive = false;
			}
		}

		if (!this.scrollActive && this.isActive){
				console.log('add listener');
			window.addEventListener('scroll', loadMore);
				this.scrollActive = true;
		}
	}
}

export default Gallery;
