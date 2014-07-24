define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var Ammoniti = require("views/subviews/AmmonitiView");
  var Espulsi = require("views/subviews/EspulsiView");
  var Gol = require("views/subviews/GolView");     
  var Foul = require("views/subviews/FoulView");    

  var resocontoDati = Utils.Page.extend({

    constructorName: "resocontoDati",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.resocontoDati;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "resocontoDati",
    className : "ContainerRreStatistic",

    events: {
      "touchend #ammoniti1": "ListAmmoniti1",
      "touchend #espulsi1":"ListEspulsi1",
      "touchend #gol1":"ListGol1",
      "touchend #falli1":"ListFalli1",
      "touchend #ammoniti2": "ListAmmoniti2",
      "touchend #espulsi2":"ListEspulsi2",
      "touchend #gol2":"ListGol2",
      "touchend #falli2":"ListFalli2",            
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      /*Carico di defaul nella lista della sq locale gli ammoniti*/
        var episodi = this.model.get('episodi').toJSON();
        var ammoniti = _.filter(episodi , function(episodio){
          return episodio.tipo == 'ammonizione' && episodio.squadra == 'locali';
        });

        var vammoniti = new Ammoniti({model : ammoniti});
        this.$el.find('#list-left').append(vammoniti.render().$el);   
      /*################################################################*/ 

      /*Carico di defaul nella lista della sq ospite gli ammoniti*/    
            var episodi = this.model.get('episodi').toJSON();
            var ammoniti = _.filter(episodi , function(episodio){
              return episodio.tipo == 'ammonizione' && episodio.squadra == 'ospiti';
            });

            var vammoniti = new Ammoniti({model : ammoniti});
            this.$el.find('#list-right').append(vammoniti.render().$el);
      /*################################################################*/   

      return this;
    },

/*Start Menu*/

/* Lista ammonizioni sq locali*/
    ListAmmoniti1: function(){
        $('#list-left').html("");//Devo cancellare il contenuto di partenza
        $('#ammoniti1').addClass("active-buttonResStatistic");
        $('#espulsi1').removeClass("active-buttonResStatistic");
        $('#gol1').removeClass("active-buttonResStatistic");
        $('#falli1').removeClass("active-buttonResStatistic");

        var episodi = this.model.get('episodi').toJSON();
        var ammoniti = _.filter(episodi , function(episodio){
          return episodio.tipo == 'ammonizione' && episodio.squadra == 'locali';
        });

        var vammoniti = new Ammoniti({model : ammoniti});
        this.$el.find('#list-left').append(vammoniti.render().$el);
    
    },
/*############################*/ 


/* Lista ammonizioni sq locali*/
    ListEspulsi1: function(){
        $('#list-left').html("");//Devo cancellare il contenuto di partenza
        $('#ammoniti1').removeClass("active-buttonResStatistic");
        $('#espulsi1').addClass("active-buttonResStatistic");
        $('#gol1').removeClass("active-buttonResStatistic");
        $('#falli1').removeClass("active-buttonResStatistic");

        var episodi = this.model.get('episodi').toJSON();
        var espulsi = _.filter(episodi , function(episodio){
        return episodio.tipo == 'espulsione' && episodio.squadra == 'locali';
        });

        var vespulsi = new Espulsi({model : espulsi});
        this.$el.find('#list-left').append(vespulsi.render().$el);
    }, 
/*############################*/ 


/* Lista gol sq locali*/
    ListGol1: function(){
        $('#list-left').html("");//Devo cancellare il contenuto di partenza
        $('#ammoniti1').removeClass("active-buttonResStatistic");
        $('#espulsi1').removeClass("active-buttonResStatistic");
        $('#gol1').addClass("active-buttonResStatistic");
        $('#falli1').removeClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var gol = _.filter(episodi , function(episodio){
              return episodio.tipo == 'gol' && episodio.squadra == 'locali';
            });

            var vgol = new Gol({model : gol});

            this.$el.find('#list-left').append(vgol.render().$el);

        },
/*############################*/ 

/* Numero di falli sq locali*/
    ListFalli1: function(){
        $('#list-left').html("");//Devo cancellare il contenuto di partenza
        $('#ammoniti1').removeClass("active-buttonResStatistic");
        $('#espulsi1').removeClass("active-buttonResStatistic");
        $('#gol1').removeClass("active-buttonResStatistic");
        $('#falli1').addClass("active-buttonResStatistic");

        var episodi = this.model.get('episodi').toJSON();
        var foul = _.filter(episodi , function(episodio){
        return episodio.tipo == 'fallo' && episodio.squadra == 'locali';
        });

        var total= foul.length;
        var vfoul = new Foul({model : foul});
        this.$el.find('#list-left').append(vfoul.render().$el);     
        $('#list-left').find('#totale-falli').html(total); 

    }, 

/*###########################*/        

/* Lista ammoniti sq ospiti*/
    ListAmmoniti2: function(){
            $('#list-right').html("");//Devo cancellare il contenuto di partenza
            $('#ammoniti2').addClass("active-buttonResStatistic");
            $('#espulsi2').removeClass("active-buttonResStatistic");
            $('#gol2').removeClass("active-buttonResStatistic");
            $('#falli2').removeClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var ammoniti = _.filter(episodi , function(episodio){
              return episodio.tipo == 'ammonizione' && episodio.squadra == 'ospiti';
            });

            var vammoniti = new Ammoniti({model : ammoniti});
            this.$el.find('#list-right').append(vammoniti.render().$el);
        },
/*##########################*/        


/*Lista espulsi sq ospiti*/
    ListEspulsi2: function(){
            $('#list-right').html("");//Devo cancellare il contenuto di partenza
            $('#ammoniti2').removeClass("active-buttonResStatistic");
            $('#espulsi2').addClass("active-buttonResStatistic");
            $('#gol2').removeClass("active-buttonResStatistic");
            $('#falli2').removeClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var espulsi = _.filter(episodi , function(episodio){
            return episodio.tipo == 'espulsione' && episodio.squadra == 'ospiti';
            });

            var vespulsi = new Espulsi({model : espulsi});
            this.$el.find('#list-right').append(vespulsi.render().$el);            
    }, 

/*########################*/    


/*Lista gol sq ospiti*/
    ListGol2: function(){
            $('#list-right').html("");//Devo cancellare il contenuto di partenza
            $('#ammoniti2').removeClass("active-buttonResStatistic");
            $('#espulsi2').removeClass("active-buttonResStatistic");
            $('#gol2').addClass("active-buttonResStatistic");
            $('#falli2').removeClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var gol = _.filter(episodi , function(episodio){
              return episodio.tipo == 'gol' && episodio.squadra == 'ospiti';
            });

            var vgol = new Gol({model : gol});

            this.$el.find('#list-right').append(vgol.render().$el);
        },
/*########################*/        


/* Lista falli sq ospiti*/
    ListFalli2: function(){
            $('#list-right').html("");//Devo cancellare il contenuto di partenza
            $('#ammoniti2').removeClass("active-buttonResStatistic");
            $('#espulsi2').removeClass("active-buttonResStatistic");
            $('#gol2').removeClass("active-buttonResStatistic");
            $('#falli2').addClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var foul = _.filter(episodi , function(episodio){
            return episodio.tipo == 'fallo' && episodio.squadra == 'ospiti';
            });

            var total= foul.length;
            var vfoul = new Foul({model : foul});
            this.$el.find('#list-right').append(vfoul.render().$el);     
            $('#list-right').find('#totale-falli').html(total); 

        },         
/*########################*/        
/*End Menu*/


  });

  return resocontoDati;

});