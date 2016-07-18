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
		this.loadMore();
	}
	
	baseUrl() {
		return `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currentPage}&format=json&nojsoncallback=1`;
	}

	searchUrl(query) {
		return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currentPage}&text=${query}&format=json&nojsoncallback=1`;
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
	}

	successHandler(me, resp) {
		me.remove(me.at(me.length - 1));
		me.totalPages = resp.photos.pages;
		me.noMore = me.currentPage++ >= me.totalPages;
		me.add(resp.photos.photo);
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
		this.isReset = true;
		this.loadMore();
	}
}

export default Photos;
