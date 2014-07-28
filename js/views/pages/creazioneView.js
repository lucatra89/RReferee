define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var Match = require("models/Match");
  var Pickers = require("pickers");
  var moment = require("moment");

  var creazione = Utils.Page.extend({

    constructorName: "creazione",

    id: "creazione",
    className : "bodyP",

    events: {

      "touchend #newMatch":"crea",
      "focus .matchDateOre":"scroll1",
      "blur .matchDateOre":"blur1",
      "focus .ArbitroSezione":"scroll2",
      "blur .ArbitroSezione":"blur2",  
      "focus .AA12Sezione":"scroll3",
      "blur .AA12Sezione":"blur3", 
      "touchend #codColoreLocali":"coloreLocali", 
      "touchend #codColoreOspiti":"coloreOspiti", 
      "touchend b":"changeColor", 

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
      Pickers.init(this.el);
      return this;
    },

    crea: function(){
      /*PREPARO I DATI*/
      /*funzione per avere l'ora corrente*/
      function matchTime() {
          var Time = "";
          var currentTime = new Date();
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();

          if (minutes < 10) {
              minutes = "0" + minutes
          }
          Time += hours + ":" + minutes;

          return Time;
      }
    	/*queryselector è come il dollaro di jquery*/
    	/*assegno alla variabile il valore di default o quello inserito dall'utente a seconda se l'utente compila o meno il campo.*/
      var jsonPartita = {};
    	if ((this.el.querySelector('#locali').value)!=""){jsonPartita.locali= this.el.querySelector('#locali').value;}
    	if ((this.el.querySelector('#ospiti').value)!=""){jsonPartita.ospiti= this.el.querySelector('#ospiti').value;}
    	if ((this.el.querySelector('#arbitro').value)!=""){jsonPartita.arbitro= this.el.querySelector('#arbitro').value;}
    	if ((this.el.querySelector('#sezioneArbitro').value)!=""){jsonPartita.sezioneArbitro= this.el.querySelector('#sezioneArbitro').value;}
    	if ((this.el.querySelector('#aa1').value)!=""){jsonPartita.aa1= this.el.querySelector('#aa1').value;}
    	if ((this.el.querySelector('#aa2').value)!=""){jsonPartita.aa2= this.el.querySelector('#aa2').value;}
    	if ((this.el.querySelector('#sezioneAa1').value)!=""){jsonPartita.sezioneAa1= this.el.querySelector('#sezioneAa1').value;}
    	if ((this.el.querySelector('#sezioneAa2').value)!=""){jsonPartita.sezioneAa2= this.el.querySelector('#sezioneAa2').value;}
    	if ((this.el.querySelector('#stadio').value)!=""){jsonPartita.stadio= this.el.querySelector('#stadio').value;}
    	if ((this.el.querySelector('#data').value)!=""){jsonPartita.data= moment().format('DD/MM/YYYY');}
    	if ((this.el.querySelector('#orario').value)!=""){jsonPartita.orario= matchTime();}
    	if ((this.el.querySelector('#categoria').value)!=""){jsonPartita.categoria= this.el.querySelector('#categoria').value;}
      jsonPartita.coloreLocali= this.el.querySelector('#codColoreLocali').style.backgroundColor;
    	jsonPartita.coloreOspiti= this.el.querySelector('#codColoreOspiti').style.backgroundColor;
    	
    	/*creo il modello della partita con le informazioni prese dal form*/
    	var newmodel = this.model.create(jsonPartita);
      Backbone.history.navigate('visio/'+newmodel.get('id') ,{trigger: true} );    
    },

    coloreLocali: function(e){
        $('#colorpicker1').removeClass("hidden").addClass("visible");
    },

    coloreOspiti: function(e){
        $('#colorpicker2').removeClass("hidden").addClass("visible");
    },

    changeColor: function(e){
        /*prendo le informazioni del colore scelto*/
        var questo = e.target.id;
        var codColore = e.target.className;
        /*determino se la palette dei colori attiva è la 1 o la 2*/
        if($('#'+questo).parent().hasClass('1')){
          /*abilito il colore nell'html e chiudo la finestra modale*/
          $('.coloreLocali').removeClass("rosso giallo azzurro nero verde").addClass(codColore);
          $('#colorpicker1').removeClass("visible").addClass("hidden");
        }else if($('#'+questo).parent().hasClass('2')){
          /*abilito il colore nell'html e chiudo la finestra modale*/
          $('.coloreOspiti').removeClass("rosso giallo azzurro nero verde").addClass(codColore);
          $('#colorpicker2').removeClass("visible").addClass("hidden");
        }
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