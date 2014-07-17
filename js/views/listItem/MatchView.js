define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var MatchView = Backbone.View.extend({

    constructorName: "MatchView",

    className : "circle",

    events : {
      "tap .button.email" : "sendEmail",
      "tap .button.delete" : "delete",
      "tap .button.open" : "open",
      "tap .content" : "select"
    },

    initialize : function(){
		this.template = Utils.templates.matchItem;
    },

    render : function(){
		this.el.innerHTML = this.template(this.model);
		
    return this;
    },

    select : function(){
      var self = this;
      if(this.$el.hasClass('visible')){
        this.el.classList.remove('visible');
        this.el.classList.add('hide');
      }
      else{
        var old = document.querySelector('.visible');
        if (old !== null){
          old.classList.remove('visible');
          old.classList.add('hide');
        }
        setTimeout(function(){
          self.el.classList.remove('hide');
          self.el.classList.add('visible');
        } , 250);
      }

    },


    delete : function(){
      var self = this;
      this.el.classList.add('toDestroy');
      setTimeout(function(){
   //     self.remove();
      }, 6000);
    },

    sendEmail : function(){

      var text = 'test';
      window.open('mailto:?body='+text);
    }


  });

  return MatchView;
});
