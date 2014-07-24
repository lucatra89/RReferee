define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var Ammoniti = Backbone.View.extend({

    constructorName: "Ammoniti",

    initialize : function(){
		this.template = Utils.templates.ammoniti;
    },

    render : function(){
      var episodi = this.model;

		this.setElement(this.template({episodi:episodi}));
		
    return this;
    },


  });

  return Ammoniti;
});
