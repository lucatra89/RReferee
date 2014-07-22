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
      "touchend #teamName1": "set",
      "touchend #newMatch":"crea",
      "keyup .form-textinput":"showValue",
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
  });

  return creazione;

});