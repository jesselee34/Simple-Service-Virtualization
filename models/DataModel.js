var Storage = require('node-persist');

Storage.initSync();

var DataModel = function(requestBody, responseBody, endpoint, id){
	if( !(this instanceof DataModel) ){
		return new DataModel(data);
	}

	if(id){
		var model = Storage.getItem(id);

		if( !model ){
			throw new Error('DataModel with id' + id + 'does not exist!');
		}

		this.id = model.id;
		this.name = model.name;
		this.method = model.method;
		this.requestBody = model.requestBody;
		this.responseBody = model.responseBody;
		this.endpoint = model.endpoint;

	} else if (!requestBody || !responseBody || !endpoint ) {
		throw new Error('requestBody, responseBody or endpoint was undefined.');
	}

	this.id = Storage.length() + 1;
	this.name = name || 'Untitled' + this.id;
	this.method = method || 'POST';
	this.requestBody = requestBody;
	this.responseBody = responseBody;
	this.endpoint = endpoint;
};

DataModel.prototype.save = function(callback){
	Storage.setItem(this.id, this, callback);
};