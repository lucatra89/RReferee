define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var resocontoDati = Utils.Page.extend({

    constructorName: "resocontoDati",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.resocontoDati;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "resocontoDati",
    className : "ContainerRreStatistic",

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

  });

  return resocontoDati;

});