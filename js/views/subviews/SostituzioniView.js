define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var Sostituzioni = Backbone.View.extend({

    constructorName: "Sostituzioni",

    initialize : function(){
		this.template = Utils.templates.sostituzioni;
    },

    render : function(){
      var episodi = this.model;

		this.setElement(this.template({episodi:episodi}));
		
    return this;
    },


  });

  return Sostituzioni;
});
