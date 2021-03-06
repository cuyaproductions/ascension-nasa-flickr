import $ from 'jquery';
import _ from 'underscore';
import {Model} from 'backbone';

class Templates extends Model {
	constructor() {
		super();
		_(this.attributes).each((value, name) => {
			$.get(`app/views/${name}.html`).then(data => {
				this.set(name, data);	
			});
		});
	}

	defaults() {
		return {
			thumbnail: '',
			header: '',
			photo: ''
		}
	}
}

const templates = new Templates();
export default templates;
