export default DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var client = payload.client,
        oic    = payload.oic;

    delete payload.experience;

    payload.client = client.id;
    payload.oic = oic.id;
    payload = { project: payload, people: [oic], client: client };
    return this._super(store, type, payload, id, requestType);
  }
});
