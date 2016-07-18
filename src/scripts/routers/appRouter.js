import $ from 'jquery';
import {Router} from 'backbone';
import Gallery from '../views/gallery';
import Photos from '../collections/photos';
import Photo from '../models/photo';
import PhotoView from '../views/photo';
import HeaderView from '../views/header';


class AppRouter extends Router {
	constructor() {
		super();
		this.App = {
			Collections: {},
			Views: {}
		}

		this.renderHeader();
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
		this.App.Views.Header.updateSearchQuery('');
		$('#app').html('').append(this.App.Views.Gallery.el);
	}
	
	photo(id) {
		const model = new Photo({id: id});
		const view =  new PhotoView({model: model});
		$('#app').html('').append(view.el);
	}
	
	search(query) {
		this.App.Collections.Photos = this.App.Collections.Photos ? this.App.Collections.Photos : new Photos();
		this.App.Collections.Photos.search(query).loadMore();
		this.App.Views.Gallery = this.App.Views.Gallery ? this.App.Views.Gallery : new Gallery({model: this.App.Collections.Photos});
		this.App.Views.Header.updateSearchQuery(query);
		$('#app').html('').append(this.App.Views.Gallery.el);
	}

	renderHeader() {
		this.App.Views.Header = this.App.Views.Header ? this.App.Views.Header : new HeaderView();
		return this.App.Views.Header.render();
	}
}

export default AppRouter;
