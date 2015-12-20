#!/usr/bin/env node
//import 'babel-polyfill';
var opts = {};

var keywords = [];
var rawFlags = [];

var keywordsEnded = false;
process.argv.slice(2).forEach((arg) => {
  if (arg[0] === '-') {
    keywordsEnded = true;
  }
  if (keywordsEnded) {
    rawFlags.push(arg);
  }
  else {
    keywords.push(arg)
  }
});

var flagMap = {
  w: 'watch',
  r: 'run',
  p: 'production',
};

var flags = rawFlags.reduce((acc, flag) => {
  if (flag[1] === '-') {
    if (flag.indexOf('=') === -1) {
      acc[flag.slice(2)] = true;
    }
    else {
      var [first, ...rest] = flag.split('=');
      var value = rest.join('=');
      acc[first] = value;
    }
  }
  else {
    [].forEach.call(flag.slice(1), (x) => {
      acc[flagMap[x]] = true;
    });
  }
  return acc;
}, {});

function assertKeywords(length, message) {
  if (keywords.length !== length) {
    console.error('syntax: ezpack ' + message);
    process.exit(1);
  }
}

if (keywords[0] === 'run') {
  assertKeywords(3, 'run {web|node} {{entry-file.js}}');
  var run = require('./run').default;
  run({
    env: keywords[1],
    entry: keywords[2],
    ...flags,
  });
}

if (keywords[0] === 'serve') {
  assertKeywords(4, 'serve {web|node} {{entry-file.js}} port');
  var serve = require('./serve').default;
  serve({
    env: keywords[1],
    entry: keywords[2],
    port: keywords[3],
    ...flags,
  });
}

if (keywords[0] === 'install') {
  var {spawn} = require('child_process');

  spawn('npm', ['install', '--save-dev',
    'webpack',
    'style-loader',
    'css-loader',
    'sass-loader',
    'less-loader',
    'json-loader',
    'babel-loader',
    'babel-core',
    'babel-polyfill',
    'webpack-dev-middleware',
  ], {stdio: 'inherit'});
}
