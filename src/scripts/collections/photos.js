import _ from 'underscore';
import {Collection} from 'backbone';
import CONFIG from '../config';
import Photo from '../models/photo';

class Photos extends Collection {
	constructor() {
		super();
		this.model = Photo;
		this.currentPage = 1;
		this.loadMore();
	}

	url() {
		return `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currenPage}&format=json&nojsoncallback=1`;
	}

	loadMore() {
		this.fetch({
			reset: false,
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
	}
}

export default Photos;
