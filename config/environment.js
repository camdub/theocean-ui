// Put general configuration here. This file is included
// in both production and development BEFORE Ember is
// loaded.
//
// For example to enable a feature on a canary build you
// might do:
//
// window.ENV = {FEATURES: {'with-controller': true}};

window.ENV = {
    authUrl: 'https://pariveda-access.azurewebsites.net/key?app=TheOcean',
    serviceUrl: 'http://theocean-services.azurewebsites.net',
    TOKEN_EXPIRATION: 1000 * 604800 * 4, // 1 month
    FEATURES: {
      'query-params-new': true
    }
};
