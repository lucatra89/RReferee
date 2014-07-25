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
      "focus input" : "onFocus",
      "touchend #close": "close"
    },

    initialize : function(){
      this.template = Utils.templates.info;
      this.on('toggleInfo', this.toggleInfo);
    },

    render : function(){
      this.el.innerHTML = this.template(this.model.toJSON());
      this.bindsEvents();
      return this;
    },

    bindsEvents: function(){
      var self = this;

      var closure = function(method) {
        return function(){
          self[method]();
        };
      };

      this.$el.find('#locali').keyup(
        _.debounce( closure('setLocali') , 450)
      );
      this.$el.find('#ospiti').keyup(
        _.debounce( closure('setOspiti') , 450)
      );
      this.$el.find('#arbitro').keyup(
        _.debounce( closure('setArbitro'), 450)
      );
      this.$el.find('#stadio').keyup(
        _.debounce( closure('setStadio'), 450)
      );
      this.$el.find('#aa1').keyup(
        _.debounce( closure('setAa1'), 450)
      );
      this.$el.find('#aa2').keyup(
        _.debounce( closure('setAa2'), 450)
      );
      this.$el.find('#sezioneArbitro').keyup(
        _.debounce( closure('setSezioneArbitro'), 450)
      );
      this.$el.find('#sezioneAa1').keyup(
        _.debounce( closure('setSezioneAa1'), 450)
      );
      this.$el.find('#sezioneAa2').keyup(
        _.debounce( closure('setSezioneAa2'), 450)
      );
      this.$el.find('#categoria').keyup(
        _.debounce( closure('setCategoria'), 450)
      );
    },

    setLocali : function(){
      var locali = this.el.querySelector('#locali').value;
      this.model.set('locali', locali);
    },

    setOspiti : function(){
      var ospiti = this.el.querySelector('#ospiti').value;
      this.model.set('ospiti',ospiti);
    },
    setArbitro : function(){
      var arbitro = this.el.querySelector('#arbitro').value;
      this.model.set('arbitro',arbitro);
    },
    setAa1 : function(){
      var aa1 = this.el.querySelector('#aa1').value;
      this.model.set('aa1',aa1);
    },
    setAa2 : function(){
      var aa2 = this.el.querySelector('#aa2').value;
      this.model.set('aa2',aa2);
    },
    setStadio : function(){
      var stadio = this.el.querySelector('#stadio').value;
      this.model.set('stadio',stadio);
    },

    setSezioneArbitro: function(){
      var sezioneArbitro = this.el.querySelector('#sezioneArbitro').value;
      this.model.set('sezioneArbitro', sezioneArbitro);
    },
    setSezioneAa1: function(){
      var sezioneAa1 = this.el.querySelector('#sezioneAa1').value;
      this.model.set('sezioneAa1', sezioneAa1);
    },

    setSezioneAa2: function(){
      var sezioneAa2 = this.el.querySelector('#sezioneAa2').value;
      this.model.set('sezioneAa2', sezioneAa2);
    },

    setCategoria: function(){
      var categoria = this.el.querySelector('#categoria').value;
      this.model.set('categoria', categoria);
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
