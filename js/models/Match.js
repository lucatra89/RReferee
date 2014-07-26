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
                barella: 0, //Viene utilizzato ?? Marco non lo usa!!!
                golLocali: 0,
                golOspiti: 0,
                falliLocali: 0, //Viene utilizzato??? Marco non lo usa!!!
                falliOspiti: 0, //Viene utilizzato??? Marco non lo usa!!!
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
                
                episodi : [

            {
                min: 54,
                tempo: 1,
                tipo: "ammonizione",
                causale: "fallo",
                calciatore: 10,
                squadra :"locali"
            },

            {
                min: 6,
                tempo: 2,
                tipo: "ammonizione",
                causale: "fallo",
                calciatore: 10,
                squadra :"ospiti"
            }


                ]
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
        },

        toReport: function(){

            var report = this.get('locali')+'%20-%20'+this.get('ospiti')+','+'%20%20';
            report += 'del:'+'%20'+this.get('data')+',%20'+'ore:'+'%20'+this.get('orario')+',%20'+'campo:'+'%20'+this.get('stadio')+',%20'+'categoria:'+'%20'+this.get('categoria');
            report += '%0A';
            report += '%0A'+'RISULTATO DELLA GARA:';
            report += '%0A'+this.get('locali')+'%20'+this.get('golLocali')+'%20'+'-'+'%20'+this.get('golOspiti')+'%20'+this.get('ospiti');           
            report += '%0A';
            report += '%0A'+'DIRETTORI DI GARA:'
            report += '%0A'+'Arbitro:'+'%20'+this.get('arbitro')+',%20'+'Sezione:'+this.get('sezioneArbitro');
            report += '%0A'+'Assistente 1:'+'%20'+this.get('aa1')+',%20'+'Sezione:'+this.get('sezioneAa1');
            report += '%0A'+'Assistente 2:'+'%20'+this.get('aa2')+',%20'+'Sezione:'+this.get('sezioneAa2');
            report += '%0A';
            report += '%0A'+'PRIMO TEMPO';
            report += '%0A'+'Ora di inizizo della gara:'+'%20'+this.get('inizio')+'%0A'+'Fine primo tempo:'+'%20'+this.get('fine');
            report += '%0A'+'Recupero segnalato:'+'%20'+this.get('RecuperoSegnalato1T')+'%0A'+'Recupeo effettivo:'+'%20'+this.get('RecuperoEffettivo1T');
            report += '%0A';
            report += '%0A'+'SECONDO TEMPO';
            report += '%0A'+'Ora di inizizo del secondo tempo:'+'%20'+this.get('inizio2')+'%0A'+'Fine della partita:'+'%20'+this.get('fine2');
            report += '%0A'+'Recupero segnalato:'+'%20'+this.get('RecuperoSegnalato2T')+'%0A'+'Recupeo effettivo:'+'%20'+this.get('RecuperoEffettivo2T');
            
            /*Continua*/
            
            return report;
        }
    });

    return Match;
});


