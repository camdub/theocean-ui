###About

This is an Ember.js app built on top of [ember-app-kit](http://iamstef.net/ember-app-kit/) (EAK). Aside from Ember itself,
we are also using the following:

- [ember-data](http://emberjs.com/guides/models/) as an ORM layer for Ember.js
- [moment](http://momentjs.com/) for data/time handling
- [lunr](http://lunrjs.com/) for client-side full-text search
- [bower](http://bower.io/) for client-side package management
- [LESS](http://lesscss.org/) as a CSS pre-processor
- [Twitter Bootstrap](http://getbootstrap.com/) for baseline UI styles
- [Flat UI](http://designmodo.github.io/Flat-UI/) for UI styles/theme

###Getting Started

1. Install [Node.js](http://nodejs.org/download/) on your machine. This will add node and npm to your system path (If you don't have the most up-to-date version of node installed you might have errors).
2. Make sure you have [git](http://git-scm.com/downloads) installed on your machine (Git should be on your path, i.e., accessible from command line).
3. Navigate to the directory where you cloned the repository.
4. ```npm install``` to install node dependencies (this should also run ```bower install``` for you).
5. ```npm install -g grunt``` and ```npm install -g grunt-cli```.
6. ```grunt server``` to start development server

### API-Stub vs the Real API

The application should work right away with the real API, but if not (API changes frequently), or you just want to test with local data only you can tell the application which to use.

Open `app/adapters/application.js`:

- Real API:  set the `host` and `headers` properties
- Local API: set `namespace` property

Comment out the ones you aren't using. If you are using the local API it will be available at `http://localhost:8000/api`