import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

class Thumbnail extends View {
	constructor(model) {
		super({
			tagName: 'li',
			className: 'gallery__item'
		});

		this.model = model;
		this.template = $.get('app/views/thumbnail.html');
		this.render();
	}

	render() {
		this.$el.html('');
		this.template.then(markup => {
			const template = _.template(markup);
			this.$el.append(template(this.model.toJSON()));
		});

		return this;
	}
}

export default Thumbnail;
