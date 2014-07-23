define(function(require) {

  var $ = require("jquery");
  require('icheck');
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var ToolsView = Backbone.View.extend({

    constructorName: "ToolsView",

    events : {

      "tap .ammonizione" : "addAmmonizione",
      "tap .espulsione"  : "addEspulsione",
      "tap .sostituzione" : "addSostituzione",
      "tap .gol" : "addGol",
      "tap .fallo" : "addFallo",
      "touchstart .highlight" : 'onTouchstart',
      "touchend .highlight" : 'onTouchend'
    },

    initialize : function(){
		this.template = Utils.templates.tools;

    },

    render : function(){

		this.setElement(this.template());

		return this;
    },

    addAmmonizione : function (e) {

      var self = this;

      var template = Utils.templates.tAmmonizione;
      this.toggleTooltip(e , template);

      if(!this.tooltip)
        return;

      var trigger = function(){
        var num = self.$el.find('[name=numero]').val();
        var causaleId = self.$el.find('[name=causale]').val();
        var causale = self.$el.find('[value='+causaleId+']').text();
        var json = { calciatore : JSON.parse(num) , causale : causale, causaleId: causaleId, tipo:'ammonizione'};
        self.trigger('episodio', json);
        self.tooltip.remove();
        self.tooltip = undefined;
      };

      this.tooltip.find('.add-episodio').on('tap' , trigger);
    },

    addEspulsione : function (e) {
      var self = this;

      var template = Utils.templates.tEspulsione;
      this.toggleTooltip(e , template);

      if(!this.tooltip)
        return;

      var trigger = function(){
        var num = self.$el.find('[name=numero]').val();
        var causaleId = self.$el.find('[name=causale]').val();
        var causale = self.$el.find('[value='+causaleId+']').text();
        var json = { calciatore : JSON.parse(num) , causale : causale, causaleId: causaleId, tipo:'espulsione'};
        self.trigger('episodio', json);
        self.tooltip.remove();
        self.tooltip = undefined;
      };

      this.tooltip.find('.add-episodio').on('tap' , trigger);
    },

    addSostituzione : function (e) {
      var self = this;
      var template = Utils.templates.tSostituzione;
      this.toggleTooltip(e , template);

      if(!this.tooltip)
        return;

      var trigger = function(){
        var entra = self.$el.find('[name=entra]').val();
        var esce = self.$el.find('[name=esce]').val();
        var json = { entra : JSON.parse(entra) , esce : JSON.parse(esce) ,  tipo:'sostituzione'};
        self.trigger('episodio', json);
        self.tooltip.remove();
        self.tooltip = undefined;
      };

      this.tooltip.find('.add-episodio').on('tap' , trigger);
    },

    addGol : function (e) {
      var self = this;

      var template = Utils.templates.tGol;
      this.toggleTooltip(e , template);
      if(!this.tooltip)
        return;
      
      var checkbox = this.tooltip.find('input[type=checkbox]');
      checkbox.iCheck({
        checkboxClass: 'icheckbox_flat-green',
        increaseArea: '20%'
      });

      var trigger = function(){
        var num = self.$el.find('[name=numero]').val();
        var rigore = checkbox.attr('checked');

        var json = { calciatore : JSON.parse(num)  , rigore : rigore ,  tipo:'gol'};
        self.trigger('episodio', json);
        self.tooltip.remove();
        self.tooltip = undefined;
      };

      this.tooltip.find('.add-episodio').on('tap' , trigger);

    },

    addFallo : function () {
      this.trigger('episodio', {tipo: 'fallo'});
      if(this.tooltip){
        this.tooltip.remove();
        this.tooltip = undefined;
      }
    },


    toggleTooltip: function(e , template){

      var $target = $(e.target);

      if(this.tooltip !== undefined){

        if(this.tooltip.parent('.tool')[0] === $target.parents('.tool')[0]){
          this.tooltip.remove();
          this.tooltip = undefined;
          return;
        }
        else
          this.tooltip.remove();
      }

      this.tooltip = $("<div class='tooltip'></div>").html(template);
      this.tooltip.append($("<div class='add-episodio highlight'>+</div>"));

      this.tooltip.find('.add-episodio').on('touchstart', this.onTouchstart);
      this.tooltip.find('.add-episodio').on('touchend', this.onTouchend);

      if($(window).width()/2 < $target.offset().left)
        this.tooltip.addClass('right');
      else
        this.tooltip.addClass('left');

      $target.parents('.tool').append(this.tooltip);
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

  return ToolsView;
});
