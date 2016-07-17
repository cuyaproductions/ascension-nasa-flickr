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

	url() {
		return `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currentPage}&format=json&nojsoncallback=1`;
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
		me.pop();
		me.currentPage++;
		_(resp.photos.photo).each((photo) => {
			me.add(photo);
		});
		me.trigger('photos:ready', me);
	}
}

export default Photos;
