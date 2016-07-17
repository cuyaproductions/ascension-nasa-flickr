import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import templates from '../models/templates';

class Header extends View {
	constructor(model) {
		super();
		this.setElement('#header');
		this.model = model;
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
		const query = $(event.target).find('#search_input').val();
		this.model.search(query);
	}
}

export default Header;
