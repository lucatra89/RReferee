define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var moment = require("moment");
    var RR = require("rrstorage");

    var Episodi = require("collections/Episodi");

    var Match = Backbone.Model.extend({
        constructorName: "Match",


        defaults :{
                locali: "Locali",
                ospiti: "Ospiti",
                coloreLocali: "azzurro",// rosso , giallo, azzurro , verde, bianco, nero
                coloreOspiti: "rosso",
                arbitro: "Arbitro",
                sezioneArbitro: "Sezione arbitro",
                aa1: "Primo assistente",
                aa2: "Secondo assistente",
                categoria: 'Nessuna categoria',
                sezioneAa1: "Sezione AA1",
                sezioneAa2: "Sezione AA2",
                stadio: "Stadio",
                data: moment().format('DD/MM/YYYY'),
                orario: moment().format('HH:mm') , //orario ufficiale
                inizio: "", //orario inizio effettivo
                fine: "",   //fine primo tempo
                inizio2: "", //orario inizio secondo tempo
                fine2: "",  //fine partita              
                RecuperoSegnalato1T: 0,
                RecuperoEffettivo1T: 0,
                RecuperoSegnalato2T: 0,
                RecuperoEffettivo2T: 0,
                barella: 0,
                golLocali: 0,
                golOspiti: 0,
                falliLocali: 0,
                falliOspiti: 0,
                aa1Giuste:0, //Non servono possono essere eliminate
                aa1Sbagliate:0, //Non servono possono essere eliminate
                aa2Giuste:0, //Non servono possono essere eliminate
                aa2Sbagliate:0, //Non servono possono essere eliminate
                aa1Giuste2:0, //Non servono possono essere eliminate
                aa1Sbagliate2:0, //Non servono possono essere eliminate
                aa2Giuste2:0, //Non servono possono essere eliminate
                aa2Sbagliate2:0, //Non servono possono essere eliminate
                tempo:1,
                min:0,
                
                episodi : []
        },

        initialize : function(){

            var episodi = new Episodi(this.get('episodi'));
            this.set('episodi' , episodi);

            this.listenTo(episodi  , 'save' , function(){
                this.save();
            });

        },


        sync : function(method , model ){

            switch(method){
                case 'read':
                    this.onRead(model);
                    break;
                case 'update':
                    this.onUpdate(model);
                    break;
                case 'create':
                    this.onCreate(model);
                    break;
                case 'delete':
                    this.onDelete(model);
                    break;
            }
        },

        onCreate : function(model){
            var id = RR.create(model);
            model.set("id" , id);
        },

        onUpdate : function(model){
            RR.update(model);
        },

        onDelete : function(model){
            RR.delete(model);
        },
        onRead : function(model){
            var id = model.get('id');
            model.set(RR.read(id));
        }


    });

    return Match;
});


