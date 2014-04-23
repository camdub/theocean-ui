var env = window.ENV;

export default DS.RESTAdapter.extend({
    /*host: env.serviceUrl,
    headers: {
        "Authorization" : "AccessKey " + JSON.parse(localStorage['authToken']).authToken
    }*/

    // required for the api stub (if using), and comment out the above
    namespace: 'api'
});
