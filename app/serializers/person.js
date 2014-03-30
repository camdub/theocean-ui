export default DS.RESTSerializer.extend({
    // sideload experiences
    // TODO: sideload metor, clients, projects
    normalizePayload: function(type, payload) {
        var typeKey = type.typeKey;
        // single item in payload
        if (typeof payload[typeKey] != "undefined"){
            type.eachRelationship(function(key, relationship) {
                var related = payload[typeKey][key],
                    type = relationship.type;

                // for now just handle experiences
                if(related && key === 'experiences') {
                    related.forEach(function(item, index) {
                        var sideloadKey = key,
                            sideloadArr = payload[sideloadKey] || [],
                            id = item['id'];

                        if(sideloadArr.findBy('id', id) != undefined)
                            return payload;

                        item['user'] = payload[typeKey]['id'];
                        sideloadArr.push(item);
                        payload[sideloadKey] = sideloadArr;
                        related[index] = item.id;
                    }, this);
                }
            });
        }
        return payload;
    }
});
