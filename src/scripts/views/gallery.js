import $ from 'jquery';
import {View} from 'backbone';
import Thumbnail from './thumbnail';

class Gallery extends View {
	constructor(model) {
		super();
		this.model = model;
		this.scrollActive = true;
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
		//debugger;

		if(!this.model.isReset) {// Check if model has been to prevent duplicate event listeners
			this.infiniteScroll(); // If model has not been reset add event listener again
		} else {
			this.model.isReset = false;
		} 
		
		console.log(this.model.noMore);
		if(this.model.noMore) {
			$('.loader').addClass('loader--nomore');
		} else {
			$('.loader').removeClass('loader--nomore');
		}

		return this;
	}

	addPhoto(model) {
		const thumbnail = new Thumbnail(model);
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
			if (height + 50 >= bottom && !me.model.noMore) {
				me.model.loadMore();
				console.log('remove listener')
				window.removeEventListener('scroll', loadMore);
			}
		}

		console.log('add listener')
		if (!me.noMore){
			window.addEventListener('scroll', loadMore);
		}
	}
}

export default Gallery;
