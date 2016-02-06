## What is this repository for? ##
* Coding templates for further use in frameworks like Nette
* Write in Less instead of CSS
* Split styles you write into several Less files and then bundle all of them into one big file + minify it
* It watches your less files and bundle them with each change in order to keep your bundled css file in sync
* Adds browser specific properties into css, so you can write pure and nice css properties in you less files
* Provides small server with hot reload of html and css for faster development. When you make a change in files and save is, it will automatically bundle your files and swap them in your browser without any reload. 

## What do I need to do to start using it? ##
* npm with nodejs (nodejs is used for bungling files and for providing sources with hot-reload functionality)

## How do I actually start using it? ##
* in root directory "npm install"
* you need to install gulp globally "npm install -g gulp"
* if you wanna use live reload server you need to install extension or plugin from http://livereload.com/
* run it with "gulp task-name"
* available task names: less, watch-less, server
* write less in templates/css/src and html in templates/html and watch the awesomeness happening
