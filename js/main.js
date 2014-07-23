// here we put the paths to all the libraries and framework we will use
require.config({
  paths: {
    jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery', 
    underscore: '../lib/underscore/underscore',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    spin: '../lib/spin/spin.min',
    utils: '../lib/utils/utils',
    moment: '../lib/moment/moment',
    rrstorage: '../lib/rrstorage/rrstorage',
    pickers: '../lib/pickers/pickers',
    icheck: '../lib/icheck/icheck.min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'moment': {
      exports: 'moment'
    }
  }
});

// We launch the App
require(['underscore', 'backbone', 'utils'], function(_, Backbone, Utils) {
  require(['router'], function(AppRouter) {
    
    document.addEventListener("deviceready", run, false);

    function run() {

      // Here we precompile ALL the templates so that the app will be much quickier when switching views
      // see utils.js
      Utils.loadTemplates().once("templatesLoaded", function() {
        // launch the router
        var router = new AppRouter();
        Backbone.history.start();
      });
    }
  });
});