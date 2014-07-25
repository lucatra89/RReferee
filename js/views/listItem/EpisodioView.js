define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var moment = require('moment');
  var Utils = require("utils");

  var EpisodioView = Backbone.View.extend({

    constructorName: "EpisodioView",
    
    className: 'event',

    initialize : function(){
		this.template = this.getTemplate();
    },

    render : function(){
      this.el.innerHTML = this.template(this.model.toJSON());
		
      return this;
    },

    getTemplate: function(){
      var template;

      switch(this.model.get('tipo')){
        case 'ammonizione':
          template = Utils.templates.epAmmonizione;
          break;
        case 'espulsione':
          template = Utils.templates.epEspulsione;
          break;
        case 'fallo':
          template = Utils.templates.epFallo;
          break;
        case 'barella':
          template = Utils.templates.epBarella;
          break;
        case 'gol':
          template = Utils.templates.epGol;
          break;
        case 'sostituzione':
          template = Utils.templates.epSostituzione;
          break;
        case 'segnalazione':
          template = Utils.templates.epSegnalazione;
          break;
      }
      
      return template;
    }


  });

  return EpisodioView;
});
