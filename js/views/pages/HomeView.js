define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var MatchView = require('views/listItem/MatchView');

  var HomeView = Backbone.View.extend({

    constructorName: "HomeView",

    className : "BodyHome",

    initialize : function(){
		this.template = Utils.templates.home;
    },

    render : function(){
		var self = this;
		this.el.innerHTML = this.template();

		this.model.each(function(model){
			var newItem = new MatchView({model : model});
			self.el.appendChild(newItem.render().el);
		});

		return this;
    }


  });

  return HomeView;
});
