grunt-template
==============

Template you can use to automatically automate all the boring stuff without configuring anything yourself. Also includes a server to serve you the files.

*NOTE: This is a work in progress.*

### What’s in here?

* [Grunt](http://gruntjs.com) – automates everything
* [Bower](http://bower.io) – package manager for JavaScript libraries
* [RequireJS](http://requirejs.org) – divide your code into modules
* [CoffeeScript](http://coffeescript.org) – JavaScript with less typing
* [Sass](http://sass-lang.com) – somewhat enhanced CSS

### What you need:

* [node.js](http://nodejs.org)
* [grunt](http://gruntjs.com)

It’s easiest to install node with [homebrew](http://brew.sh).

1. To install grunt (you need to have node installed): `npm install -g grunt-cli`.
2. `npm install` installs grunt and dependencies into a `node_modules` dir. Try not to touch this ;)
3. `bower install` pulls down all the JS libs you need

### Project layout

* **app**  
Your stuff is in here.
	* **images**  
Images. They’re automatically png-crushed etc.
	* **styles**  
CSS. Files ending in `.scss` are compiled by SASS.
		* **vendor**  
CSS files from components etc. Include normally in your template.
	* **scripts**  
JavaScript. Files ending in `.coffee` are compiled by CoffeeScript.
		* **vendor**  
JavaScript libraries that you can’t install via bower. This folder is not jslinted.
* **dist**  
Last production version
* **dist-zips**  
Distribution version zips.
* **node_modules**  
Node installs its modules here. Don’t care about it, don’t touch it.
* **.gitignore**
It has all the files you’ll want to ignore. Don’t forget to copy it!
* **.jshintrc** – jshint config file
* **.bowerrc** – bower config file
* **.editorconfig** – editor config file
* **.tm_properties** – TextMate config file, exludes directories you don’t want included in your search paths

You can add additional directories, nothing will happen to them. For example, include a `etc` directory for Python scripts you need. Knock yourself out.

There’s some sample data, scripts, css and html included for you to get started.

Don’t forget to set your email in git, so everyone knows who comitted what: `git config user.email "your.email@zeit.de"`.


Development usage
-----------------

1. Put your stuff into the `src` dir
2. Run `grunt server` to compile all sorts of things
3. Go to [localhost:9000](http://localhost:9000/)

Whenever you wanna minify multiple CSS/JS files into one for production (preserving the order), do this in your html:

````html
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="styles/vendor/otherpeoples.css">
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->
````

Otherwise, include everything like you usually would.

There are examples for doing this in the `index.html` file. There are also examples for using RequireJS and CoffeeScript and so on.

### Installing/using JavaScript libraries

Install additional JavaScript libraries like so:

````bash
$ bower search d3
Search results:

    d3 git://github.com/mbostock/d3.git
    …
    
$ bower install d3 --save
bower cached        git://github.com/mbostock/d3.git#3.2.8
bower validate      3.2.8 against git://github.com/mbostock/d3.git#*
bower install       d3#3.2.8

d3#3.2.8 app/bower_components/d3
````

Don’t forget to add them to the RequireJS config in `app/scripts/main.coffee`.

Building a distributable package
--------------------------------

* Increment your version number if you have to. We try to use [Semantic Versioning](http://semver.org), with *try* being an important modifier.
* Run `grunt` to build a distributable version.
* Everything’s put into a single zip file in `dist-zips`.





Copy and paste the following part into your project’s README.md so people know how to set up your project
========================================

How to set up
-------------

### What you need:

* [node.js](http://nodejs.org)
* [grunt](http://gruntjs.com)

It’s easiest to install node with [homebrew](http://brew.sh).

To install grunt (you need to have node installed): `npm install -g grunt-cli`


### Set-up instructions

1. clone git repository
2. go to directory
3. `npm install` installs grunt and dependencies into a `node_modules` dir. Try not to touch this ;)
4. `bower install` pulls down all the JS libs you need

`grunt server` then watches the files for changes and compiles them for you. It’ll also serve them up on [localhost:9000](http://localhost:9000/).

You may need to quit and restart `grunt server` occasionally if something in `Gruntfile.js` or `package.json` changes.

Don’t forget to set your email in git, so everyone knows who comitted what: `git config user.email "your.email@zeit.de"`.

### Distributing

`grunt` builds a zip file with all the files you need. Change the version number in `package.json`, if you need to. We try to use [Semantic Versioning](http://semver.org), with *try* being an important modifier.