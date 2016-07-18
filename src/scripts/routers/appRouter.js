import $ from 'jquery';
import {Router} from 'backbone';
import Gallery from '../views/gallery';
import Photos from '../collections/photos';
import Photo from '../models/photo';
import PhotoView from '../views/photo';


class AppRouter extends Router {
	constructor() {
		super();
		this.App = {
			Collections: {
				Photos: new Photos()
			} 
		}
	}
	routes() {
		return {
			'': 'gallery',
			'photo/:id': 'photo'
		}
	}

	gallery() {
		const gallery = new Gallery({model: this.App.Collections.Photos});
		$('#app').html('').append(gallery.el);
	}
	
	photo(id) {
		const model = this.App.Collections.Photos.length ? this.App.Collections.Photos.get(id) : new Photo({id: id});
		const photoView = new PhotoView({model: model});
		$('#app').html('').append(photoView.el);
	}
}

export default AppRouter;
