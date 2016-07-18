import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import templates from '../models/templates';

class Thumbnail extends View {
	constructor(model) {
		super();

		this.model = model;
		this.template = 'thumbnail';

		this.listenTo(templates, `change:${this.template}`, this.render);
	}

	tagName() {
		return 'li';
	}

	className() {
		return 'gallery__item';
	}

	render() {
		const template = _.template(templates.get(this.template));
		this.$el.html('');
		this.$el.append(template(this.model.toJSON()));
		return this;
	}
}

export default Thumbnail;
