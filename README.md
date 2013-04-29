# The Ocean

## Contributing

Once you have met all system dependencies (see below), run 

    npm install && bower install

This will install necessary dependencies for the application. 

NPM will install its dependencies into the `node_modules` folder and Bower will install into `app/dependencies`.

Since Ember-model (see below) does not have a bower config, you'll need to download Ember-model manually and put it in `app/dependencies/ember-model`.

### Libaries in Use

- [Ember.js](http://emberjs.com) awesome JS MV* framework. See guides on the website for a getting started video. Also recommended to read the guides through.
- [Ember Model](https://github.com/ebryn/ember-model) until Ember-data is more stable
- [Lunr.js](http://lunrjs.com/) for indexed search on the client (might replace this)
- [QUnit](http://qunitjs.com/) for testing and phantomjs to run the tests on the command line.
- [Sinon](http://sinonjs.org/) for mocks and stubs in tests
- [Foundation](http://foundation.zurb.com/docs/) for mobile-first and base styles

### Grunt Tasks

Once all the dependencies have been installed you can start a development server with

    grunt server
    
Which will build development versions of the application into the `build` folder and start the app on `localhost:9001`. 

This application uses livereload and will automatically refresh the browser page when files are changed.

	grunt test
	
will run the tests for this application, but the server task will do this as well in the process of serving your application.

We are enforcing style with JSHint. To see what rules are enforced see the `.jshintrc` file and the [docs](http://www.jshint.com/docs/) for JSHint. This runs automatically with the `server` and `test` tasks but if you want to run jshint stand alone you can do that too with

	grunt jshint
	
It would be good to add this as a git precommit/prepush hook so that we enforce code style on all commits.

There also is a [grunt chrome plugin](https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb) that allows you to run grunt tasks from the development console. If you want to use that plugin, run

	grunt devtools
	
and then open the extension in your browser development console.

## Dependencies
To build this project you need to have Node and Ruby installed. 

### Node.js 

You can download and install Node from [here](http://nodejs.org). It will also install npm (the package manager).

### Ruby

Ruby is required for this project only because we are using [Sass](http://sass-lang.com/), the CSS preprocessor. You don't need to know any Ruby (or Node.js) to work on this project.

If you are on Mac OS you already have Ruby installed. 

The best way to install Ruby on Windows is via the [RubyInstaller for Windows](http://rubyinstaller.org/downloads/). Any version is fine, but Ruby 2.0 is very new and you might run into issues (I recommend just installing 1.9.3).

Make sure you add Ruby to your PATH as in the screenshot below:

![Add Ruby to PATH](http://cdn.impressivewebs.com/2012-08/sass-step-1.jpg)

Once Ruby is installed, open the cmd prompt and run

	gem install sass
	
This will install the sass pre-processor so that the grunt server task can compile your css.

### Windows Users

You also need to have msysgit installed for Bower to work. Check the option below:

![msysgit configuration for Windows](http://f.cl.ly/items/2V2O3i1p3R2F1r2v0a12/mysgit.png)