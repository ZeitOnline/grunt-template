grunt-template
==============

Template you can use to automatically automate all the boring stuff without configuring anything yourself.

### What you need:

* [node.js](http://nodejs.org)
* [grunt](http://gruntjs.com)

It’s easiest to install node with [homebrew](http://brew.sh).

To install grunt (you need to have node installed): `npm install -g grunt-cli`.


### Project layout

* **dev**  
Your compiled templates are output here. Point your browser at this directory.
* **dist**  
This is were the productions versions are saved
* **node_modules**  
Node installs its modules here. Don’t care about it, don’t touch it.
* **src**
	* **assets**  
Static assets, e.g. images.
	* **css**  
CSS, SASS, whatever, goes here. Files ending in `.scss` are automatically compiled by SASS. *Note that in the compiled version, they’re included in alphabetical order.* 
	* **js**  
JavaScript. Files ending in `.coffee` are compiled by CoffeeScript. *Note that in the compiled version, they’re included in alphabetical order.*
		* **libs**  
JavaScript libraries. *Note that in the compiled version, they’re included in alphabetical order.*
	* **tpl**  
Templates, ending in `.html.tpl`. They’re compiled, see below for variables you can/should use in them.
* **temp**  
Temp files, e.g. compiled CoffeeScript etc. Don’t care about it.
* **.gitignore**
It has all the files you’ll want to ignore. Don’t forget to copy it!

You can add additional directories, nothing will happen to them. For example, include a `scripts` directory for Python scripts you need. Knock yourself out.

There’s some sample data, scripts, css and html included for you to get started.

Don’t forget to set your email in git, so everyone knows who comitted what: `git config user.email "your.email@zeit.de"`.


Development usage
-----------------

1. Put your stuff into the `src` dir
2. Run `grunt` or `grunt watch` to compile all sorts of things
3. Dev stuff is put into a `dev` dir in the root folder
4. Images and all other static assets go into `src/assets`. For production use, they’re automatically copied to the right place.

Inside the templates, you have to have two different script/css include sections for development and production. For development, you wanna have single files so you can see where the errors are, for production, just one. It’s done like this:

    <!-- @if NODE_ENV='development' -->
    <link rel="stylesheet" href="<%= sass_path %>style.css" type="text/css">
    <script src="<%= js_path %>libs/jquery-1.10.2.js"></script>
    <script src="<%= js_path %>data/probabilityData.json"></script>
    <script src="<%= coffee_path %>script.js"></script>
    <!-- @endif -->
    <!-- @if NODE_ENV='production' -->
    <link rel="stylesheet" href="style.<!-- @echo VERSION -->.css" type="text/css">
    <script src="script.<!-- @echo VERSION -->.js"></script>
    <!-- @endif -->

This also shows the use of variables for the paths.

Here are the available variables:

* `<%= js_path %>` – for regular JS
* `<%= coffee_path %>` – for compiled CoffeeScript
* `<%= css_path %>` – for regular CSS
* `<%= sass_path %>` – for compiled SASS
* `<%= asset_path %>` – for images and other static content

In your CSS, use compass’ url helper: `image-url("backgrounds/cats.gif")`

Individual CSS and JS files are read from the `src` and `temp` dirs, as long as you use the variables, you don’t really have to know that though.

If you have templates you use only for development you don’t want included in the production version, use a `.dev.html.tpl` extension (e.g. to have a mock article to test embeds in).


Building a distributable package
--------------------------------

* Increment your version number if you have to. We try to use [Semantic Versioning](http://semver.org), with *try* being an important modifier.
* Run `grunt dist` to build a distributable version.
* Everything’s put into a single zip file in `dist`.





Copy and paste the following part into your project’s README.md so people know how to set up your project
========================================

How to set up
-------------

### What you need:

* [node.js](http://nodejs.org)
* [grunt](http://gruntjs.com)

It’s easiest to install node with [homebrew](http://brew.sh).

To install grunt (you need to have node installed): `npm install -g grunt-cli`.


### Set-up instructions

1. clone git repository
2. go to directory
3. `npm install` – installs grunt and dependencies into a `node_modules` dir. Try not to touch this ;)
4. `grunt` generate all the files you need

Your compiled templates are in the `dev` directory. You can load them with your browser from there, e.g. `dev/index.html`.

`grunt watch` then watches the files for changes and compiles them for you.

You may need to quit and restart `grunt watch` occasionally if something in `Gruntfile.js` or `package.json` changes.

Don’t forget to set your email in git, so everyone knows who comitted what: `git config user.email "your.email@zeit.de"`.

### Distributing

`grunt dist` builds a zip file with all the files you need. Change the version number in `package.json`, if you need to. We try to use [Semantic Versioning](http://semver.org), with *try* being an important modifier.