define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var DashboardView = Backbone.View.extend({

    constructorName: "ToolsView",

    events : {

      "tap .button" : "onTap"
    },

    initialize : function(){
		this.template = Utils.templates.dashboard;

    },

    render : function(){

		this.setElement(this.template());

		return this;
    },

    onTap : function(){
      alert('ok');
    }


  });

  return DashboardView;
});
