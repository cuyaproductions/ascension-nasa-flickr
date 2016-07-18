import _ from 'underscore';
import {Collection, Events} from 'backbone';
import CONFIG from '../config';
import Photo from '../models/photo';

class Photos extends Collection {
	constructor() {
		super();
		_.extend(this, Events); 
		this.model = Photo;
		this.currentPage = 1;
	}
	
	baseUrl() {
		return `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currentPage}&extras=date_upload,date_taken,views&format=json&nojsoncallback=1`;
	}

	searchUrl(query) {
		return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currentPage}&text=${query}&extras=date_upload,date_taken,views&format=json&nojsoncallback=1`;
	}

	url() {
		return this.baseUrl();
	}

	loadMore() {
		this.fetch({
			remove: false,
			success: this.successHandler,
			error: () => {
				throw new Error('Error getting photos!');
			} 
		});
		return this;
	}

	successHandler(me, resp) {
		me.comparator = 'date_upload';
		me.sort();
		me.remove(me.at(0));
		me.totalPages = resp.photos.pages;
		me.noMore = me.currentPage++ >= me.totalPages;
		me.add(resp.photos.photo);
		me.trigger('photos:loaded', me);
	}
	
	clean() {
		this.currentPage = 1;
		this.noMore = false;
		this.reset([]);
		this.url = () => {return this.baseUrl()};
		return this;
	}

	search(query) {
		this.clean();
		this.url = () => {return this.searchUrl(query)};
		return this;
	}
}

export default Photos;
