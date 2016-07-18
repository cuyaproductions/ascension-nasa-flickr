import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import templates from '../models/templates';

class Photo extends View {
	constructor(options) {
		super(options);
		this.model.loadData();	
		this.template = 'photo';

		this.listenTo(this.model, 'sync', this.render);
	}

	tagName() {
		return 'div';
	}

	className() {
		return 'photo';
	}

	render() {
		const template = _.template(templates.get(this.template));
		this.$el.html('');
		this.$el.append(template(this.model.toJSON()));
		$('.loader').hide();
		return this;
	}
}

export default Photo;
