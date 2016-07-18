import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import templates from '../models/templates';

class Header extends View {
	constructor() {
		super();
		this.setElement('#header');
		this.template = 'header';

		if (templates.get(this.template)) {
			this.render();	
		}
		this.listenTo(templates, `change:${this.template}`, this.render);
	}

	events() {
		return {
			'submit #form': 'search'
		}
	}

	render() {
		const template = _.template(templates.get(this.template));
		this.$('.header__search').html(template());
		return this;
	}

	search(event) {
		event.preventDefault();
		const query = $(event.target).find('.search__input').blur().val();
		window.location.hash = `#/search/${encodeURI(query)}`;
	}

	updateSearchQuery(query) {
		this.$('.search__input').val(query);
	}
}

export default Header;
