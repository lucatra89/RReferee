define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var Match = require("models/Match");


  var creazione = Utils.Page.extend({

    constructorName: "creazione",

    id: "creazione",
    className : "bodyP",

    events: {

      "touchend #newMatch":"crea",
      "touchend .form-textinput":"showValue",
      "focus .matchDateOre":"scroll1",
      "blur .matchDateOre":"blur1",
      "focus .ArbitroSezione":"scroll2",
      "blur .ArbitroSezione":"blur2",  
      "focus .AA12Sezione":"scroll3",
      "blur .AA12Sezione":"blur3",            
    },

    initialize : function(){
    this.template = Utils.templates.creazione;
    },

    render : function(){
    var self = this;
    this.el.innerHTML = this.template();
    (function(model){
    	var match = new Match(model);
	});
    return this;
    },

    set: function(e) {

    },

    crea: function(){
    	/*queryselector è come il dollaro di jquery*/
    	var locali= this.el.querySelector('#locali').value;
    	var ospiti= this.el.querySelector('#ospiti').value;
    	// var coloreLocali= this.el.querySelector('#coloreLocali').value;
    	// var coloreOspiti= this.el.querySelector('#coloreOspiti').value;
    	var arbitro= this.el.querySelector('#arbitro').value;
    	var sezioneArbitro= this.el.querySelector('#sezioneArbitro').value;
    	var aa1= this.el.querySelector('#aa1').value;
    	var aa2= this.el.querySelector('#aa2').value;
    	var sezionaAa1= this.el.querySelector('#sezioneAa1').value;
    	var sezioneAa2= this.el.querySelector('#sezioneAa2').value;
    	var stadio= this.el.querySelector('#stadio').value;
    	var data= this.el.querySelector('#data').value;
    	var orario= this.el.querySelector('#orario').value;
    	var categoria= this.el.querySelector('#categoria').value;
    	/*creo il modello della partita con le informazioni prese dal form*/
    	
    	this.model.create({'locali':locali});
    	/*,"ospiti":ospiti,"arbitro":arbitro,"sezioneArbitro":sezioneArbitro,"aa1":aa1,"aa2":aa2,"sezionaAa1":sezionaAa1,"sezioneAa2":sezioneAa2,"stadio":stadio,"data":data,"orario",orario,"categoria",categoria*/
    },

    showValue: function(e){
    	//e.target contiene l'elemento html riferito.
    	//input contiene il valore digitato
    	//var input = e.target.value;
    	//alert(input);
    },
/*START SCROLL DELLA PAGINA*/
    scroll1: function(){
      $('.app').addClass('line1');
        },
    blur1: function(){
      $('.app').removeClass('line1');
        }, 
    scroll2: function(){
      $('.app').addClass('line2');
        },
    blur2: function(){
      $('.app').removeClass('line2');
        },  
    scroll3: function(){
      $('.app').addClass('line3-4');
        },
    blur3: function(){
      $('.app').removeClass('line3-4');
        },                
/*EDN SCROLL DELLA PAGINA*/               

  });

  return creazione;

});