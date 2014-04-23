export default DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var client = payload.client,
        oic    = payload.oic,
        people = payload.people;

    payload.people = people.mapBy('id');
    people.push(oic);

    payload.client = client.id;
    payload.oic = oic.id;
    payload = { project: payload, people: people, client: client };
    return this._super(store, type, payload, id, requestType);
  }
});
