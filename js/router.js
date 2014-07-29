define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var RR = require('rrstorage');

    var moment = require('moment');
    moment.lang('it');

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
            "resocontoInfo/:id": "resocontoInfo", //per provare la pagina togliere il /:id dalla routes
            "resocontoDati/:id": "resocontoDati" //per provare la pagina togliere il /:id dalla routes
        },

        initialize: function(options) {

            this.currentView = undefined;
            this.matches = new Matches(RR.getMatches());
            
            var pending = this.matches.findWhere({pending:true});
            if(pending)
                pending.destroy();

            this.on('pageChanged', this.onPageChanged);
            document.addEventListener('backbutton', function(){});
        },


        home: function() {
            debugger;
            var page = new HomeView({ model: this.matches});
            this.changePage(page);
        },

        creazione: function() {
            var handler = function() {
                Backbone.history.navigate('home', {trigger: true});
            };
            this.once('pageChanged' , function(){
              this.structureView.trigger('handleClose', handler);
            });

            var model = this.matches;

            var page = new creazione({
                model: model
            });

            this.changePage(page);
        },

        visio: function(id) {
            
            var handler = function() {
                page.trigger('exit');
            };

            this.once('pageChanged' , function(){
              this.structureView.trigger('handleClose', handler);
              this.structureView.trigger('showBinfo');
            });

            var model = this.matches.getMatchById(JSON.parse(id));

            var page = new VisioView({
                model: model
            });

            this.changePage(page);

            page.listenTo(this.structureView, 'showInfo', function() {
                this.trigger('showInfo');
            });

        },

        resocontoDati: function(id) {

            var handler = function() {
                Backbone.history.navigate('home', {trigger: true});
            };

            this.once('pageChanged' , function(){
              this.structureView.trigger('handleClose', handler);
            });

            var model = this.matches.getMatchById(JSON.parse(id));

            var page = new resocontoDati({
                model: model
            });

            this.changePage(page);

        },

        resocontoInfo: function(id) {
            var handler = function() {
                Backbone.history.navigate('home', {trigger: true});
            };

            this.once('pageChanged' , function(){
              this.structureView.trigger('handleClose', handler);
            });

             var model = this.matches.getMatchById(JSON.parse(id));

            var page = new resocontoInfo({
                model: model
            });

            this.changePage(page);

        },

        onPageChanged: function() {
            this.structureView.trigger('hideBinfo');
            this.structureView.trigger('removeHandlerClose');
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
            this.navigate("home", { trigger: true });
        },

    });

    return AppRouter;

});