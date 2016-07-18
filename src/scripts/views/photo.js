import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

class Photo extends View {
	constructor(options) {
		super(options);

		this.template = _.template('<h1><%= title._content %></h1>');
		this.model.getData();

		this.listenTo(this.model, 'sync', this.render);
	}

	tagName() {
		return 'div';
	}

	className() {
		return 'photo';
	}

	render() {
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	}
}

export default Photo;
