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

    this.model.on('change:locali', this.changeLocali);
    this.model.on('change:ospiti', this.changeOspiti);
    this.model.on('change:golLocali', this.changeGolLocali);
    this.model.on('change:golOspiti', this.changeGolOspiti);
    this.model.on('change: min', this.changeMin);
    this.model.on('change: tempo', this.changeTempo);


    this.$el.find('#controller')[0].addEventListener('tap', this.changeState);
    this.$el.find('#controller').on('tap', this.cloStart());

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
    },

    changeLocali: function (model, value) {
      document.getElementById('locali').innerText = value;
    },

    changeOspiti: function (model, value) {
      document.getElementById('ospiti').innerText = value;
    },

    changeGolLocali: function (model, value) {
      document.getElementById('golLocali').innerText = value;
    },
    changeGolOspiti: function(model, value){
      document.getElementById('golOspiti').innerText = value;
    },

    changeMin: function(model, value){
      document.getElementById('min').innerText = value;
    },
    changeTempo: function(model, value){
      document.getElementById('tempo').innerText = value;
    },

    changeState: function(){
      var el = document.getElementById('timer');

      if( _.contains(el.classList, 'active'))
        el.classList.remove('active');
      else
        el.classList.add('active');

    },

    cloStart: function(){
      self = this;
      return function(){
        self.start();
        self.$el.find('#controller').off('tap');
        self.$el.find('#controller').on('tap',  self.cloStop());
      };
    },

    cloStop:function(){
      self = this;
      return function(){
        self.stop();
        self.$el.find('#controller').off('tap');
        self.$el.find('#controller').on('tap', self.cloStart());
      };
    },

    start: function(){

    },

    stop: function(){
      
    }




  });

  return DashboardView;
});
