define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var moment = require('moment');
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
      var json = this.model.toJSON();
      var m = moment(json.data , 'DD/MM/YYYY');

      json.giorno = m.format('DD');
      json.mese = m.format('MMMM').capitalize();
      json.anno = m.format('YYYY');

      this.el.innerHTML = this.template(json);
		
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

    open : function () {
      Backbone.history.navigate('resocontoDati/'+this.model.get('id') ,{trigger: true} );
      document.body.scrollLeft = 0;
    },


    delete : function(){
      var self = this;
      this.toDestroy();
      setTimeout(function(){
        self.translateNext();
      }, 500);

      this.model.destroy();
    },

    sendEmail : function(){
      var subject = 'Report%20RReferee';
      var text = this.model.toReport();
      window.open('mailto:?subject=' + subject + '&body='+text);
    },

    translateNext: function(){
      var $next = this.$el.next();
      if(!$next[0])
        return;

      var oldtransform = $next[0].style.transform;
      var transform;

      if(oldtransform === "")
        transform = 'translate3d(-700px,0,0)';
      else{
        var x = JSON.parse(oldtransform.substring(12, 16));
        x -= 700;
        transform = 'translate3d(' + x + 'px,0,0)';
      }

      while($next[0]){
        $next[0].style.transform = transform;
        $next = $next.next();
      }

    },

    toDestroy: function(){

      var transform = this.el.style.transform;
      if(transform === "")
        this.el.style.transform = 'translate3d(0,700px,0)';

      var start = transform.substring(0,20);
      var end = transform.substring(23, 29);

      this.el.style.transform =  start + '700px'+end;
    }


  });

  return MatchView;
});
