import _ from 'underscore';
import {Collection} from 'backbone';
import CONFIG from './config';
import Photo from './photo';

class Photos extends Collection {
	constructor() {
		super();
		this.model = Photo;
		this.currentPage = 1;

		this.fetch({
			success: (me, resp) => {
				me.pop();
				me.currentPage++;
				_(resp.photos.photo).each((photo) => {
					me.add(photo);
				});
			},
			error: () => {
				throw new Error("Error getting photos!");
			} 
		});
	}

	url() {
		return `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${CONFIG.api_key}&user_id=${CONFIG.user_id}&per_page=${CONFIG.per_page}&page=${this.currenPage}&format=json&nojsoncallback=1`;
	}
}

export default Photos;
