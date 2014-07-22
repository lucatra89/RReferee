define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var creazione = Utils.Page.extend({

    constructorName: "creazione",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.creazione;
      //this.p = new partita();
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "creazione",
    className : "bodyP",

    events: {
      "touchend #teamName1": "set",
      "touchend .nuova-visionatura":"show",
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

    return this;
    },

    set: function(e) {
      this.p.set("team1","cambiato");
      //alert($('#teamName1').val());
      // prova di setting 
        // partita.set({
        // team1: "modificato",
        // //alert(team1),
        // // just setting random number for id would set as primary key from server
        // //id: Math.floor(Math.random() * 100) + 1
        // });
    },

    show: function(){
      var item = this.p.team1.val();
      alert(item);
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