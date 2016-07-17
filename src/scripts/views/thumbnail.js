import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import templates from '../models/templates';

class Thumbnail extends View {
	constructor(model) {
		super({
			tagName: 'li',
			className: 'gallery__item'
		});

		this.model = model;
		this.template = 'thumbnail';

		if (templates.get(this.template)) {
			this.render();	
		}
		this.listenTo(templates, `change:thumbnail`, this.render);
	}

	test(data) {
		console.log(data);
	}

	render() {
		this.$el.html('');
		const template = _.template(templates.get(this.template));
		this.$el.append(template(this.model.toJSON()));
		return this;
	}
}

export default Thumbnail;
