define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var Foul = Backbone.View.extend({

    constructorName: "Foul",

    initialize : function(){
		this.template = Utils.templates.foul;
    },

    render : function(){
      var episodi = this.model;

		this.setElement(this.template({episodi:episodi}));
		
    return this;
    },


  });

  return Foul;
});
