// Put your production configuration here.
//
// This is useful when using a separate API
// endpoint in development than in production.
//
// window.ENV.public_key = '123456'
window.ENV.authCallback = window.location.origin + '?key=[key]';

var Caliper = {
  config: { apiKey: "9da0df0b-9537-4c83-8bee-f25d6bb624b0" }
};
