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
      this.Matches = [];
    },


    home : function(){
      var model= new Backbone.Collection([{},{},{}]);
      var page = new HomeView({model: model});

      this.changePage(page);

    },

    creazione : function(){
/*passo la collection*/
      var model= this.matches;
      var page = new creazione({model: model});


      this.changePage(page);
    },

    visio : function(id){

      var model = new Match();
      var page = new VisioView({model: model});

      this.changePage(page);
    },

    resocontoDati : function(id){

    //var model = this.Matches.getById(id);
      var model= new Match({
        'locali':'sulmona',
        'ospiti':'teramo',
        'aa1Giuste':'1',
        'aa1Sbagliate':'2',
        'aa1Giuste2':'3',
        'aa1Sbagliate2':'4',
        'aa2Giuste':'5',
        'aa2Sbagliate':'6',
        'aa2Giuste2':'7',
        'aa2Sbagliate2':'8',
        'barella1':'40',
        'barella2':'20',
        'inizio':'17:00',
        'fine':'17:48',
        'RecuperoSegnalato1T':'2',
        'RecuperoEffettivo1T':'3',
        'inizio2':'18:10',
        'fine2':'18:55',
        'RecuperoSegnalato2T':'1',
        'RecuperoEffettivo2T':'1',

      });

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
      this.navigate("home" , {trigger: true});
    },

  });

  return AppRouter;

});