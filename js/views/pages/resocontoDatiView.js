define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var Ammoniti = require("views/subviews/AmmonitiView");
  var Espulsi = require("views/subviews/EspulsiView");
  var Gol = require("views/subviews/GolView");     
  var Sostituzioni = require("views/subviews/SostituzioniView");    

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
      "touchend #sostituzioni1":"ListSostituzioni1",
      "touchend #ammoniti2": "ListAmmoniti2",
      "touchend #espulsi2":"ListEspulsi2",
      "touchend #gol2":"ListGol2",
      "touchend #sostituzioni2":"ListSostituzioni2",  
      "tap #info-button" : "info",          
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      var episodi = this.model.get('episodi').toJSON();
      /*Falli sq locali*/
            var episodi = this.model.get('episodi').toJSON();
            var foul_locali = _.filter(episodi , function(episodio){
            return episodio.tipo == 'fallo' && episodio.squadra == 'locali';
            });

            var totallocali= foul_locali.length; 
            this.$el.find('#falli-locali').append(totallocali);         
      /*#########################################################*/
      /*Falli sq ospiti*/
            var episodi = this.model.get('episodi').toJSON();
            var foul_ospiti = _.filter(episodi , function(episodio){
            return episodio.tipo == 'fallo' && episodio.squadra == 'ospiti';
            });

            var totalospiti= foul_ospiti.length;   
            this.$el.find('#falli-ospiti').append(totalospiti);     
      /*#########################################################*/      
      /*Carico le segnalazioni effettive errate dell'assistente 1*/

            var ListaCorretteA1T1 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.assistente == 1 && episodio.tempo == 1 ;
            });

            var ListaErrateA1T1 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.assistente == 1 && episodio.tempo == 1 ;
            });

            var ListaCorretteA1T2 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.assistente == 1 && episodio.tempo == 2 ;
            });

            var ListaErrateA1T2 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.assistente == 1 && episodio.tempo == 2 ;
            });            

            var corettaT1A1= ListaCorretteA1T1.length;
            var errataT1A1= ListaErrateA1T1.length;
            var corettaT2A1= ListaCorretteA1T2.length;
            var errataT2A1= ListaErrateA1T2.length;            
            this.$el.find('#trueAA1T1').append(corettaT1A1);  
            this.$el.find('#falseAA1T1').append(errataT1A1);   
            this.$el.find('#trueAA1T2').append(corettaT2A1);  
            this.$el.find('#falseAA1T2').append(errataT2A1);                        
      /*################################################################*/ 
      /*Carico le segnalazioni effettive errate dell'assistente 2*/

            var ListaCorretteA2T1 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.assistente == 2 && episodio.tempo == 1 ;
            });

            var ListaErrateA2T1 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.assistente == 2 && episodio.tempo == 1 ;
            });

            var ListaCorretteA2T2 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.assistente == 2 && episodio.tempo == 2 ;
            });

            var ListaErrateA2T2 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.assistente == 2 && episodio.tempo == 2 ;
            });            

            var corettaT1A2= ListaCorretteA2T1.length;
            var errataT1A2= ListaErrateA2T1.length;
            var corettaT2A2= ListaCorretteA2T2.length;
            var errataT2A2= ListaErrateA2T2.length;            
            this.$el.find('#trueAA2T1').append(corettaT1A2);  
            this.$el.find('#falseAA2T1').append(errataT1A2);   
            this.$el.find('#trueAA2T2').append(corettaT2A2);  
            this.$el.find('#falseAA2T2').append(errataT2A2);                        
      /*################################################################*/ 

      /*############### Conteggio barelle primo tempo ##################*/
            var ListaBarellaT1 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'barella' && episodio.tempo == 1 ;
            });

            var barellaT1= ListaBarellaT1.length;
            this.$el.find('#barella1T').append(barellaT1); 
      /*################################################################*/


      /*############### Conteggio barelle secondo tempo ##################*/
            var ListaBarellaT2 = _.filter(episodi , function(episodio){
            return episodio.tipo == 'barella' && episodio.tempo == 2 ;
            });

            var barellaT2= ListaBarellaT2.length;
            this.$el.find('#barella2T').append(barellaT2); 
      /*################################################################*/


      /*Carico di defaul nella lista della sq locale gli ammoniti*/
        var ammoniti = _.filter(episodi , function(episodio){
          return episodio.tipo == 'ammonizione' && episodio.squadra == 'locali';
        });

        var vammoniti = new Ammoniti({model : ammoniti});
        this.$el.find('#list-left').append(vammoniti.render().$el);   
      /*################################################################*/ 

      /*Carico di defaul nella lista della sq ospite gli ammoniti*/    
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
        $('#sostituzioni1').removeClass("active-buttonResStatistic");

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
        $('#sostituzioni1').removeClass("active-buttonResStatistic");

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
        $('#sostituzioni1').removeClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var gol = _.filter(episodi , function(episodio){
              return episodio.tipo == 'gol' && episodio.squadra == 'locali';
            });

            var vgol = new Gol({model : gol});

            this.$el.find('#list-left').append(vgol.render().$el);

        },
/*############################*/ 

/* Numero di falli sq locali*/
    ListSostituzioni1: function(){
        $('#list-left').html("");//Devo cancellare il contenuto di partenza
        $('#ammoniti1').removeClass("active-buttonResStatistic");
        $('#espulsi1').removeClass("active-buttonResStatistic");
        $('#gol1').removeClass("active-buttonResStatistic");
        $('#sostituzioni1').addClass("active-buttonResStatistic");

        var episodi = this.model.get('episodi').toJSON();
        var sostituzione = _.filter(episodi , function(episodio){
        return episodio.tipo == 'sostituzione' && episodio.squadra == 'locali';
        });

        var vsostituzioni = new Sostituzioni({model : sostituzione});
        this.$el.find('#list-left').append(vsostituzioni.render().$el);     

    }, 

/*###########################*/        

/* Lista ammoniti sq ospiti*/
    ListAmmoniti2: function(){
            $('#list-right').html("");//Devo cancellare il contenuto di partenza
            $('#ammoniti2').addClass("active-buttonResStatistic");
            $('#espulsi2').removeClass("active-buttonResStatistic");
            $('#gol2').removeClass("active-buttonResStatistic");
            $('#sostituzioni2').removeClass("active-buttonResStatistic");

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
            $('#sostituzioni2').removeClass("active-buttonResStatistic");

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
            $('#sostituzioni2').removeClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var gol = _.filter(episodi , function(episodio){
              return episodio.tipo == 'gol' && episodio.squadra == 'ospiti';
            });

            var vgol = new Gol({model : gol});

            this.$el.find('#list-right').append(vgol.render().$el);
        },
/*########################*/        


/* Lista falli sq ospiti*/
    ListSostituzioni2: function(){
            $('#list-right').html("");//Devo cancellare il contenuto di partenza
            $('#ammoniti2').removeClass("active-buttonResStatistic");
            $('#espulsi2').removeClass("active-buttonResStatistic");
            $('#gol2').removeClass("active-buttonResStatistic");
            $('#sostituzioni2').addClass("active-buttonResStatistic");

            var episodi = this.model.get('episodi').toJSON();
            var sostituzione = _.filter(episodi , function(episodio){
            return episodio.tipo == 'sostituzione' && episodio.squadra == 'ospiti';
            });

            var vsostituzioni = new Sostituzioni({model : sostituzione});
            this.$el.find('#list-right').append(vsostituzioni.render().$el);     
            $('#list-right').find('#totale-falli').html(total); 

        },         
/*########################*/        
/*End Menu*/
    info: function(){
        Backbone.history.navigate('resocontoInfo/'+this.model.get('id') ,{trigger: true} );
        },  

  });

  return resocontoDati;

});