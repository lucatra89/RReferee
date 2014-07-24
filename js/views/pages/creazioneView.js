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
    	/*assegno alla variabile il valore di default o quello inserito dall'utente a seconda se l'utente compila o meno il campo.*/
    	if ((this.el.querySelector('#locali').value)!=""){var locali= this.el.querySelector('#locali').value;}else{var locali= this.el.querySelector('#locali').placeholder;}
    	if ((this.el.querySelector('#ospiti').value)!=""){var ospiti= this.el.querySelector('#ospiti').value;}else{var ospiti= this.el.querySelector('#ospiti').placeholder;}
    	if ((this.el.querySelector('#arbitro').value)!=""){var arbitro= this.el.querySelector('#arbitro').value;}else{var arbitro= this.el.querySelector('#arbitro').placeholder;}
    	if ((this.el.querySelector('#sezioneArbitro').value)!=""){var sezioneArbitro= this.el.querySelector('#sezioneArbitro').value;}else{var sezioneArbitro= this.el.querySelector('#sezioneArbitro').placeholder;}
    	if ((this.el.querySelector('#aa1').value)!=""){var aa1= this.el.querySelector('#aa1').value;}else{var aa1= this.el.querySelector('#aa1').placeholder;}
    	if ((this.el.querySelector('#aa2').value)!=""){var aa2= this.el.querySelector('#aa2').value;}else{var aa2= this.el.querySelector('#aa2').placeholder;}
    	if ((this.el.querySelector('#sezioneAa1').value)!=""){var sezionaAa1= this.el.querySelector('#sezioneAa1').value;}else{var sezionaAa1= this.el.querySelector('#sezioneAa1').placeholder;}
    	if ((this.el.querySelector('#sezioneAa2').value)!=""){var sezioneAa2= this.el.querySelector('#sezioneAa2').value;}else{var sezioneAa2= this.el.querySelector('#sezioneAa2').placeholder;}
    	if ((this.el.querySelector('#stadio').value)!=""){var stadio= this.el.querySelector('#stadio').value;}else{var stadio= this.el.querySelector('#stadio').placeholder;}
    	if ((this.el.querySelector('#data').value)!=""){var data= this.el.querySelector('#data').value;}else{var data= this.el.querySelector('#data').placeholder;}
    	if ((this.el.querySelector('#orario').value)!=""){var orario= this.el.querySelector('#orario').value;}else{var orario= this.el.querySelector('#orario').placeholder;}
    	if ((this.el.querySelector('#categoria').value)!=""){var categoria= this.el.querySelector('#categoria').value;}else{var categoria= this.el.querySelector('#categoria').placeholder;}
    	// if ((this.el.querySelector('#coloreLocali').value)!=""){var coloreLocali= this.el.querySelector('#coloreLocali').value;}else{var coloreLocali= this.el.querySelector('#coloreLocali').placeholder;}
    	// if ((this.el.querySelector('#coloreOspiti').value)!=""){var coloreOspiti= this.el.querySelector('#coloreOspiti').value;}else{var coloreOspiti= this.el.querySelector('#coloreOspiti').placeholder;}
    	
    	/*creo il modello della partita con le informazioni prese dal form*/
    	this.model.create({"locali":locali,"ospiti":ospiti,"arbitro":arbitro,"sezioneArbitro":sezioneArbitro,"aa1":aa1,"aa2":aa2,"sezionaAa1":sezionaAa1,"sezioneAa2":sezioneAa2,"stadio":stadio,"data":data,"orario":orario,"categoria":categoria});
    	
    },

    showValue: function(e){
    	//e.target contiene l'elemento html riferito.
    	//input contiene il valore digitato
    	//var input = e.target.value;
    	//alert(input);
    },
/*START SCROLL DELLA PAGINA*/
    scroll1: function(e){
      $('.app').addClass('line1');
      e.target.autofocus=true;
        },
    blur1: function(e){
      $('.app').removeClass('line1');
      e.target.autofocus=true;
        }, 
    scroll2: function(e){
      $('.app').addClass('line2');
      e.target.autofocus=true;
        },
    blur2: function(e){
      $('.app').removeClass('line2');
      e.target.autofocus=true;
        },  
    scroll3: function(e){
      $('.app').addClass('line3-4');
      e.target.autofocus=true;
        },
    blur3: function(e){
      $('.app').removeClass('line3-4');
      e.target.autofocus=true;
        },                
/*EDN SCROLL DELLA PAGINA*/               

  });

  return creazione;

});