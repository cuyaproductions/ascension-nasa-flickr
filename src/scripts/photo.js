import {Model} from 'backbone';

class Photo extends Model {
	constructor (data) {
		super();

		for(let key in data) {
			if (data.hasOwnProperty(key)) {
				this.set(key, data[key]);
			}
		}
	}

	defaults() {
		return {
			id: '',
			secret: '',
			server: '',
			farm: 0,
			title: '',
			owner: '',
			ispublic: 1,
			isfriend: 0,
			isfamily: 0
		}
	}

	image() {
		return `https://farm${this.get("farm")}.staticflickr.com/${this.get("server")}/${this.get("id")}_{this.get("secret")}.jpg` 
	}
}

export default Photo;
