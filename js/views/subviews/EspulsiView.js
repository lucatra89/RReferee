define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var Espulsi = Backbone.View.extend({

    constructorName: "Espulsi",

    initialize : function(){
		this.template = Utils.templates.espulsi;
    },

    render : function(){
      var episodi = this.model;

		this.setElement(this.template({episodi:episodi}));
		
    return this;
    },


  });

  return Espulsi;
});
