import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import templates from '../models/templates';

class Header extends View {
	constructor(options) {
		super(options);
		this.setElement('#header');
		this.template = 'header';

		this.listenTo(templates, `change:${this.template}`, this.render);
	}

	events() {
		return {
			'submit #form': 'search',
			'change #sort': 'sort'
		}
	}

	render() {
		const template = _.template(templates.get(this.template));
		this.$('.header__controls').html(template());
		return this;
	}

	search(event) {
		event.preventDefault();
		const query = $(event.target).find('.search__input').blur().val();
		window.location.hash = `#/search?q=${encodeURI(query)}`;
	}

	updateSearchQuery(query) {
		this.$('.search__input').val(query);
	}

	sort(event) {
		this.model.comparator = event.target.value;
		this.model.sort();
	}
}

export default Header;
