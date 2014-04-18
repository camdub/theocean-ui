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

1. Install Node.js on your machine. This will add node and npm to your system path.
2. Make sure you have git installed on your machine.
3. Navigate to the directory where you cloned the repository.
4. ```npm install``` to install node dependencies (this should also run ```bower install``` for you).
5. ```npm install -g grunt``` and ```npm install -g grunt-cli```.
6. ```grunt server``` to start development server