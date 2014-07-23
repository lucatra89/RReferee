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

    events: {
      "touchend #ammoniti1": "ListAmmoniti1",
      "touchend #espulsi1":"ListEspulsi1",
      "touchend #gol1":"ListGol1",
      "touchend #falli1":"ListFalli1",
      "touchend #ammoniti2": "ListAmmoniti2",
      "touchend #espulsi2":"ListEspulsi2",
      "touchend #gol2":"ListGol2",
      "touchend #falli2":"ListFalli2",            
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

/*Start Menu*/
    ListAmmoniti1: function(){
      $('#list-left').html("ammoniti");
        },

    ListEspulsi1: function(){
            $('#list-left').html("ciao");
        }, 

    ListGol1: function(){
            $('#list-left').html("gol");
        },

    ListFalli1: function(){
            $('#list-left').html("falli");
        }, 

    ListAmmoniti2: function(){
            $('#list-right').html("ammoniti");
        },

    ListEspulsi2: function(){
            $('#list-right').html("espulsi");
        }, 

    ListGol2: function(){
            $('#list-right').html("gol");
        },

    ListFalli2: function(){
            $('#list-right').html("f");
        },         
/*End Menu*/





  });

  return resocontoDati;

});