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
			Collections: {},
			Views: {}
		}
	}
	routes() {
		return {
			'': 'gallery',
			'photo/:id': 'photo',
			'search/:query': 'search'
		}
	}

	gallery() {
		this.App.Collections.Photos = this.App.Collections.Photos ? this.App.Collections.Photos: new Photos();
		this.App.Collections.Photos.clean().loadMore();
		this.App.Views.Gallery = this.App.Views.Gallery ? this.App.Views.Gallery : new Gallery({model: this.App.Collections.Photos});
		$('#app').html('').append(this.App.Views.Gallery.el);
	}
	
	photo(id) {
		const model = this.App.Collections.Photos && this.App.Collections.Photos.length ? this.App.Collections.Photos.get(id) : new Photo({id: id});
		const photoView = new PhotoView({model: model});
		$('#app').html('').append(photoView.el);
	}
	
	search(query) {
		this.App.Collections.Photos = this.App.Collections.Photos ? this.App.Collections.Photos : new Photos();
		this.App.Collections.Photos.search(query);
		this.App.Views.Gallery = this.App.Views.Gallery ? this.App.Views.Gallery : new Gallery({model: this.App.Collections.Photos});
		$('#app').html('').append(this.App.Views.Gallery.el);
	}
}

export default AppRouter;
