define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");

  var StructureView = require("views/StructureView");
  var HomeView = require("views/pages/HomeView");
  var VisioView = require("views/pages/VisioView");
  var creazione = require("views/pages/creazioneView");
  var resocontoInfo = require("views/pages/resocontoInfoView");
  var resocontoDati = require("views/pages/resocontoDatiView");

  var Match = require("models/Match");
  var Episodio = require("models/Episodio");

  var Matches = require("collections/Matches");
  var Episodi = require("collections/Episodi");


  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "home": "home",
      "creazione": "creazione",
      "visio/:id": "visio",
      "resocontoInfo/:id":"resocontoInfo",//per provare la pagina togliere il /:id dalla routes
      "resocontoDati" : "resocontoDati",
    },

    initialize: function(options) {
      this.currentView = undefined;
    },


    home : function(){
      var model= new Backbone.Collection([{},{},{}]);
      var page = new HomeView({model: model});

      this.changePage(page);

    },

    creazione : function(){
      var model= new Backbone.Collection([{},{},{}]);
      var page = new creazione({model: model});

      this.changePage(page);
    },

    visio : function(id){

    },

    resocontoDati : function(id){
      var model= new Backbone.Collection([{},{},{}]);
      var page = new resocontoDati({model: model});

      this.changePage(page);

    },

    resocontoInfo : function(id){
      var model= new Backbone.Collection([{},{},{}]);
      var page = new resocontoInfo({model: model});

      this.changePage(page);

    },

    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate("creazione" , {trigger: true});
    },

  });

  return AppRouter;

});