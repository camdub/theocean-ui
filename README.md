# The Ocean

## Getting Started

Before jumping in, you should complete the [step-by-step tutorial]() featured on the Ember guides.

Built on top of ember-app-kit. See [its getting started guide](http://iamstef.net/ember-app-kit/) for more information on how it works (and by extention, how our build process works).

The Ocean uses query parameters for filtering on some of the pages. This feature is currently an Ember beta feature. The documentation for this feature is not on the ember website, but can be found on this [pull request](https://github.com/emberjs/ember.js/pull/3182). Because of this we are using the canary/beta builds of Ember until this feature is released.

**See the [wiki]() for detailed documentaion of how the application works.**

### Libraries

- [Ember Model]() - assits with data layer, provides much more limited set of features than [ember-data](), the "official" data library for ember. We are using ember-model for two reasons:
	1. The Ocean is primarily read-only, so we don't need some of the nice features ember-data includes to keep data in sync.
	2. ember-data is still in beta, and documentation is severly lacking.
- [Lunr.js]() - full-text search in the browser.
- [QUnit]() - JS testing library used to test ember core, so is more suited to ember testing than some others.
- [Bootstrap]() - front-end CSS framework written in LESS
	- [Flat UI]() - Flat theme built on top of bootstrap

Because of issues faced previously with [Bower]() not working correctly, we are not using a front-end package management system. Additional libraries should be dropped into their own folder under `vendor` and added to `public/index.html`.


## Contributing

Once you have met all system dependencies (see below), run 

    npm install

This will install all necessary node.js dependencies for the application. 

NPM will install its dependencies into the `node_modules` folder.

### Dependencies

The only dependency for this project is Node.js. To get Node.js visit [nodejs.org](http://nodejs.org). It will also install npm (the package manager).



