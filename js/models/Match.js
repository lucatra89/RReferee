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
                locali: "",
                ospiti: "",
                coloreLocali: "",// rosso , giallo, azzurro , verde, bianco, nero
                coloreOspiti: "",
                arbitro: "",
                sezioneArbitro: "",
                aa1: "",
                aa2: "",
                sezioneAa1: "",
                sezioneAa2: "",
                stadio: "",
                data: "",
                orario: "", //orario ufficiale
                inizio: "", //orario inizio effettivo
                fine: "",
                categoria: "",
                golLocali: 0,
                golOspiti: 0,
                falliLocali: 0,
                falliOspiti: 0,
                aa1Giuste:0,
                aa1Sbagliate:0,
                aa2Giuste:0,
                aa2Sbagliate:0,
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


