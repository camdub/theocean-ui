# The Ocean

## Dependencies
To build this project you need to have Node installed. Download Node.js [here](http://nodejs.org).

### Windows users

You also need to have msysgit installed. Check the option below:

![msysgit configuration for Windows](http://f.cl.ly/items/2V2O3i1p3R2F1r2v0a12/mysgit.png)

## Contributing

Once you have node installed, run 

    npm install && bower install

This will install necessary dependencies for the application. 

NPM will install its dependencies into the `node_modules` folder and Bower will install into `app/dependencies`.

Once all the dependencies have been installed you can start a development server with

    grunt server
    
Which will build development versions of the application into the `build` folder and open the app in a web browser. 

This application uses livereload and will automatically refresh the browser page when files are changed.
