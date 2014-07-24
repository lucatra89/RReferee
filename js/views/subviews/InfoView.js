define(function(require) {

  var $ = require("jquery");
  require('icheck');
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var InfoView = Backbone.View.extend({

    constructorName: "InfoView",

    tagName : 'form',

    events : {
      "blur #locali" : "setLocali",
      "blur #ospiti" : 'setOspiti',
      "blur #arbitro" : 'setArbitro',
      "blur #stadio" : 'setStadio',
      "blur #aa1" : 'setAa1',
      "blur #aa2" : 'setAa2',
      "focus input" : "onFocus",
      "touchend #close": "close"
    },

    initialize : function(){
      this.template = Utils.templates.info;
      this.on('toggleInfo', this.toggleInfo);
    },

    render : function(){
      this.el.innerHTML = this.template(this.model.toJSON());
      return this;
    },

    setLocali : function(){
      var locali = this.el.querySelector('#locali').value;
      this.model.set('locali', locali);
    },

    setOspiti : function(){
      var ospiti = this.el.querySelector('ospiti').value;
      this.model.set('ospiti','ospiti');
    },
    setArbitro : function(){
      var arbitro = this.el.querySelector('arbitro').value;
      this.model.set('arbitro','arbitro');
    },
    setAa1 : function(){
      var aa1 = this.el.querySelector('aa1').value;
      this.model.set('aa1','aa1');
    },
    setAa2 : function(){
      var aa2 = this.el.querySelector('aa2').value;
      this.model.set('aa2','aa2');
    },
    setStadio : function(){
      var stadio = this.el.querySelector('stadio').value;
      this.model.set('stadio','stadio');
    },

    onFocus : function(){
      this.trigger('focus');
    },

    close : function(){
      this.trigger('close');
    }

  });

  return InfoView;
});
