define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var resocontoInfo = Utils.Page.extend({

    constructorName: "resocontoInfo",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.resocontoInfo;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "resocontoInfo",
    className : "bodyResForm",

    events: {  
      "tap #statistic-button" : "resDati",          
    },    

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    resDati: function(){
        Backbone.history.navigate('resocontoDati/'+this.model.get('id') ,{trigger: true} );
        },     

  });

  return resocontoInfo;

});