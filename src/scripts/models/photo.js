import {Model} from 'backbone';
import CONFIG from '../config';

class Photo extends Model {
	constructor (options) {
		super(options);
	}

	defaults() {
		return {
			id: '',
			secret: '',
			server: '',
			farm: 0,
			title: '',
			owner: '',
			ispublic: 1,
			isfriend: 0,
			isfamily: 0
		}
	}

	url() {
		return `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${CONFIG.api_key}&photo_id=${this.get('id')}&format=json&nojsoncallback=1`
	}

	getData() {
		this.fetch({
			reset: true,
			success: this.successHandler
		});
	}

	successHandler(me, response) {
		me.set(response.photo);
	}
}

export default Photo;
