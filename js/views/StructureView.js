define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    className : "app",

    events: {
      "touchend #newMatch": "crea",
    },

    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.structure;
      this.on("inTheDOM", this.rendered);
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content');
      return this;
    },


    // generic go-back function
    goBack: function() {
      //window.history.back();
    },

    crea: function(event) {
      Backbone.history.navigate("resocontoInfo/1", {
        trigger: true
      });
    },


  });

  return StructureView;

});