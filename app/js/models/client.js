attr = Ember.attr;

App.Client = Ember.Model.extend({
	id: attr('string'),
	clientName: attr('string'),
	industry: attr('string'),
	logo: attr('string')
});

App.Client.reopenClass({
	merge: function(data) {
		if(!data.hasOwnProperty('id')){
			this.create(data);
		}
		var record = this.cachedRecordForId(data['id']);

		if(record.get('isLoaded')){
			for(var prop in data){
				record.set(prop, data[prop]);
			}
			return record;
		}

		return this.create(data);
	}
});

App.Client.adapter = Ember.Adapter.create({
	findAll: function(klass, recordArray) {
		$.getJSON(App.baseURL + "/clients", {}, function(data){
			Ember.run(function() {
				return recordArray.load(klass, data.clients);
			});
		});
	},
	find: function(record, id) {
		$.getJSON(App.baseURL + "/clients/" + id + "/projects", {}, function(data){
			Ember.run(function() {
				return record.load(id, data);
			});
		});
	},
	ajax: function(url, params, method) {
		var settings = {
			url: App.baseURL + url,
			method: method,
			dataType: 'json'
		};
		return Ember.$.ajax(settings);
	}
});
