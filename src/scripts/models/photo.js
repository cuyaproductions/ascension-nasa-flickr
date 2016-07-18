import {Model} from 'backbone';
import CONFIG from '../config';

class Photo extends Model {
	constructor (options) {
		super(options);
	}

	defaults() {
		return {
			id: 0
		}
	}
	
	url() {
		return `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${CONFIG.api_key}&photo_id=${this.get('id')}&format=json&nojsoncallback=1`;
	}

	loadData() {
		this.fetch({
			reset: true,
			success: this.successHandler
		});
	}

	successHandler(me, response) {
		me.unset('photo');
		me.set(response.photo);
	}
}

export default Photo;
