define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var moment = require('moment');

  var DashboardView = Backbone.View.extend({

    constructorName: "ToolsView",

    events : {

      "tap #aa1v" : "addAa1Esatta",
      "tap #aa2v" : "addAa2Esatta",
      "tap #aa1x" : "addAa1Errata",
      "tap #aa2x" : "addAa2Errata",
      "tap #barella": "addBarella",
      "touchstart .highlight" : 'onTouchstart',
      "touchend .highlight" : 'onTouchend',
      "tap #pausa" : 'pausa'

    },

    initialize : function(){
		this.template = Utils.templates.dashboard;
    this.model.set('pause1t', []);
    this.model.set('pause2t', []);
    this.model.set('pending', true);

    },

    render : function(){
    var el = this.template(this.model.toJSON());
		this.setElement(el);

    this.model.on('change:locali', this.changeLocali);
    this.model.on('change:ospiti', this.changeOspiti);
    this.model.on('change:golLocali', this.changeGolLocali);
    this.model.on('change:golOspiti', this.changeGolOspiti);
    this.model.on('change:min', this.changeMin);
    this.model.on('change:tempo', this.changeTempo);


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
      this.model.set('ferma', false);
      var tempo = this.model.get('tempo');
      this.model.set('inizio'+tempo+'t' , moment().format('HH:mm'));
      this.startTimer();
      document.getElementById('label_controller').innerText = 'fine '+tempo+'t';

    },

    stop: function(){
      this.model.set('ferma', true);
     clearInterval(this.timer);
     this.timer = undefined;

      var tempo = this.model.get('tempo');
      var min = this.model.get('min');
      var recupero = (min <= 45) ? 0 : min - 45;

      this.model.set('fine'+tempo+'t' , moment().format('HH:mm'));
      this.model.set('recupero'+tempo+'t', recupero);

      if(tempo == 1){
        this.model.set('tempo', 2);
        this.model.set('min', 0);
        document.getElementById('label_controller').innerText = 'inizio 2t';
      }
      else{
        Backbone.history.navigate('resocontoDati/'+this.model.get('id'), {trigger:true});
        this.model.unset('pending');
      }
    },

    pausa: function(){
      var tempo = this.model.get('tempo');
      if(this.inizioPausa){
        this.model.set('ferma', false);
        this.startTimer();
        var durata = moment().diff(moment.unix(this.inizioPausa), 'minutes');
        this.model.get('pause'+tempo+'t').push(durata);
        document.getElementById('label_pausa').innerText = 'stop';
        document.getElementById('controller').style.visibility = 'visible';
        this.inizioPausa= undefined;
      }
      else{
        this.model.set('ferma', true);
        clearInterval(this.timer);
        this.timer = undefined;
        this.inizioPausa = moment().unix();
        document.getElementById('label_pausa').innerText = 'riprendi';
        document.getElementById('controller').style.visibility = 'hidden';
      }

    },

    startTimer: function(){
      var tempo = this.model.get('tempo');
      var self = this;
      this.timer = setInterval(function(){
        var inizio = moment(self.model.get('inizio'+ tempo + 't'), 'HH:mm');
        var pause = self.model.get('pause'+tempo+'t');
        var min = moment().diff(inizio, 'minutes') - _(pause).sum();
         self.model.set('min', min);
      }, 60000);
    }




  });

  return DashboardView;
});
