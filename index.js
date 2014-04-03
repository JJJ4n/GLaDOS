'use strict';
var GLaDOS = require(__dirname + '/lib/glados');

GLaDOS.use(require(__dirname + '/scripts/chancontrol')());
GLaDOS.use(require(__dirname + '/scripts/cleverbot')());
GLaDOS.use(require(__dirname + '/scripts/control')());
GLaDOS.use(require(__dirname + '/scripts/cryptocoin')());
GLaDOS.use(require(__dirname + '/scripts/dice')());
GLaDOS.use(require(__dirname + '/scripts/google')());
GLaDOS.use(require(__dirname + '/scripts/hash')());
GLaDOS.use(require(__dirname + '/scripts/lastfm')());
GLaDOS.use(require(__dirname + '/scripts/morse')());
GLaDOS.use(require(__dirname + '/scripts/net')());
GLaDOS.use(require(__dirname + '/scripts/ping')());
GLaDOS.use(require(__dirname + '/scripts/quiz')());
GLaDOS.use(require(__dirname + '/scripts/sandbox')());
GLaDOS.use(require(__dirname + '/scripts/stats')());
GLaDOS.use(require(__dirname + '/scripts/translate')());
GLaDOS.use(require(__dirname + '/scripts/urbandictionary')());
GLaDOS.use(require(__dirname + '/scripts/urltitle')());
GLaDOS.use(require(__dirname + '/scripts/weather')());
GLaDOS.use(require(__dirname + '/scripts/wikipedia')());
GLaDOS.use(require(__dirname + '/scripts/wolframalpha')());