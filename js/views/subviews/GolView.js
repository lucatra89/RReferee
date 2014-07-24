define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var Gol = Backbone.View.extend({

    constructorName: "Gol",

    initialize : function(){
		this.template = Utils.templates.gol;
    },

    render : function(){
      var episodi = this.model;

		this.setElement(this.template({episodi:episodi}));
		
    return this;
    },


  });

  return Gol;
});
