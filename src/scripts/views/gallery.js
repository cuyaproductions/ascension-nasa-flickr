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
		this.isActive = true;
		this.infiniteScroll(); 
		this.updateLoader();
		
		this.$el.html('');
		this.model.each(this.addPhoto, this);
		return this;
	}

	updateLoader() {
		if (this.isActive) {
			$('.loader').show().addClass('loader--collapsed');	
		}

		if(this.model.noMore) {
			$('.loader').addClass('loader--nomore');
		} else {
			$('.loader').removeClass('loader--nomore');
		}
		
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
		const me = this;
		function loadMore() {
			const height = window.innerHeight,
						bottom = document.body.getClientRects()[0].bottom;
			if (height + 50 >= bottom && !me.model.noMore && me.isActive) {
				me.model.loadMore();
				window.removeEventListener('scroll', loadMore);
				me.scrollActive = false;
			}
		}

		if (!this.scrollActive && this.isActive){
			window.addEventListener('scroll', loadMore);
				this.scrollActive = true;
		}
	}
}

export default Gallery;
