define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var DashboardView = Backbone.View.extend({

    constructorName: "ToolsView",

    events : {

      "tap #aa1v" : "addAa1Esatta",
      "tap #aa2v" : "addAa2Esatta",
      "tap #aa1x" : "addAa1Errata",
      "tap #aa2x" : "addAa2Errata",
      "tap #barella": "addBarella",
      "touchstart .highlight" : 'onTouchstart',
      "touchend .highlight" : 'onTouchend'

    },

    initialize : function(){
		this.template = Utils.templates.dashboard;

    },

    render : function(){
    var el = this.template(this.model.toJSON());
		this.setElement(el);

		return this;
    },


    addAa1Esatta : function(){

      this.trigger('episodio',{
        tipo: 'segnalazione',
        assistente : 1,
        giudizio : 'esatta'
      });

    },
    addAa1Errata : function(){

      this.trigger('episodio',{
        tipo: 'segnalazione',
        assistente : 1,
        giudizio : 'errata'
      });

    },
    addAa2Esatta : function(){

      this.trigger('episodio',{
        tipo: 'segnalazione',
        assistente : 2,
        giudizio : 'esatta'
      });

    },
    addAa2Errata : function(){

      this.trigger('episodio',{
        tipo: 'segnalazione',
        assistente : 2,
        giudizio : 'errata'
      });

    },

    addBarella : function(){

      this.trigger('episodio',{ tipo: 'barella'});
    },

    onTouchstart : function(e){

      var $target = $(e.target);
      if($target.hasClass('highlight'))
        $target.css('borderColor', '#eee');
      else
        $target.parents('.highlight').css('borderColor', '#eee');
    },

    onTouchend : function(e){
      var $target = $(e.target);
      if($target.hasClass('highlight'))
        $target.css('background', '');
      else
        $target.parents('.highlight').css('borderColor', '');
    }


  });

  return DashboardView;
});
