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

                inizio1t: "", //orario inizio effettivo
                fine1t: "",   //fine primo tempo
                inizio2t: "", //orario inizio secondo tempo
                fine2t: "",  //fine partita              
                RecuperoSegnalato1t: 0,
                RecuperoEffettivo1t: 0,
                RecuperoSegnalato2t: 0,
                RecuperoEffettivo2t: 0,
                barella: 0,
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
        },

        toReport: function(){

            var list = this.get('episodi').toJSON();
            /*############## BLOCCO SEGNALAZIONE FUORIGIOCO #############*/
            /*SEGNALAZIONI FUORIGIOCO AA1*/
            var SegFAA1T1 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.tempo == 1 && episodio.assistente == 1;
            });
            var SegFAA1T2 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.tempo == 2 && episodio.assistente == 1;
            });
            var ErrFAA1T1 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.tempo == 1 && episodio.assistente == 1;
            });
            var ErrFAA1T2 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.tempo == 2 && episodio.assistente == 1;
            });
            /*SEGNALAZIONI FUORIGIOCO AA2*/
            var SegFAA2T1 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.tempo == 1 && episodio.assistente == 2;
            });
            var SegFAA2T2 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'corretta' && episodio.tempo == 2 && episodio.assistente == 2;
            });
            var ErrFAA2T1 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.tempo == 1 && episodio.assistente == 2;
            });
            var ErrFAA2T2 = _.filter(list , function(episodio){
              return episodio.tipo == 'segnalazione' && episodio.giudizio == 'errata' && episodio.tempo == 2 && episodio.assistente == 2;
            });
            /*############################################################*/

            /*################ Lista Gol ###########################*/
            var listgol = _.filter(list , function(episodio){
              return episodio.tipo == 'gol';
            });
            var JsonGol = JSON.stringify(listgol);
            var Gol = JSON.parse(JsonGol);
            /*############################################################*/

            /*################ Lista Ammoniti ###########################*/
            var ammoniti = _.filter(list , function(episodio){
              return episodio.tipo == 'ammonizione';
            });
            var JsonAmmoniti = JSON.stringify(ammoniti);
            var Ammoniti = JSON.parse(JsonAmmoniti);
            /*############################################################*/

            /*################ Lista Espulsi ###########################*/
            var espulsioni = _.filter(list , function(episodio){
              return episodio.tipo == 'espulsione';
            });
            var JsonEspulsi = JSON.stringify(espulsioni);
            var Espulsi = JSON.parse(JsonEspulsi);
            /*############################################################*/



            var report = this.get('locali')+'%20-%20'+this.get('ospiti')+','+'%20%20';
            report += 'del:'+'%20'+this.get('data')+',%20'+'ore:'+'%20'+this.get('orario')+',%20'+'campo:'+'%20'+this.get('stadio')+',%20'+'categoria:'+'%20'+this.get('categoria');
            report += '%0A';
            report += '%0A'+'RISULTATO DELLA GARA:';
            report += '%0A'+this.get('locali')+'%20'+this.get('golLocali')+'%20'+'-'+'%20'+this.get('golOspiti')+'%20'+this.get('ospiti');
            report += '%0A';
            report += '%0A'+'ELENCO DEI GOL:';
            if(Gol.length!==0){
                for (var i = 0 ; i < Gol.length; i++) {
                    report +='%0A'+'All\''+ Gol[i].min+'%20'+'del%20'+Gol[i].tempo+'%20tempo%20'+Gol[i].squadra;
                }
            }else{
                report += '%0A'+'Non ci sono state reti!';
            }
            report += '%0A';
            report += '%0A'+'DIRETTORI DI GARA:';
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
            report += '%0A';
            report += '%0A'+'FUORIGIOCO SEGNALATO AA1:'+'%20%20';
            report += '%0A'+'Primo tempe:%20'+SegFAA1T1.length;
            report += '%20%20%20%20'+'Secondo tempe:%20'+SegFAA1T2.length;
            report += '%0A';
            report += '%0A'+'FUORIGIOCO NON SEGNALATO AA1:'+'%20%20';
            report += '%0A'+'Primo tempe:%20'+ErrFAA1T1.length;
            report += '%20%20%20%20'+'Secondo tempe:%20'+ErrFAA1T2.length;
            report += '%0A';
            report += '%0A'+'FUORIGIOCO SEGNALATO AA2:'+'%20%20';
            report += '%0A'+'Primo tempe:%20'+SegFAA2T1.length;
            report += '%20%20%20%20'+'Secondo tempe:%20'+SegFAA2T2.length;
            report += '%0A';
            report += '%0A'+'FUORIGIOCO NON SEGNALATO AA2:'+'%20%20';
            report += '%0A'+'Primo tempe:%20'+ErrFAA2T1.length;
            report += '%20%20%20%20'+'Secondo tempe:%20'+ErrFAA2T2.length;
            report += '%0A';
            report += '%0A'+'LISTA AMMONITI%20';
            if(Ammoniti.length!==0)
                for (var j = 0 ; j < Ammoniti.length; j++)
                    report +='%0A'+'All\''+ Ammoniti[j].min+'%20'+'del%20'+Ammoniti[j].tempo+'%20tempo%20'+'il numero%20'+Ammoniti[j].calciatore+'%20dell\''+Ammoniti[j].squadra+'%20per%20'+Ammoniti[j].causale;
            else
                report += '%0A'+'Non ci sono state ammonizioni !';
            
            report += '%0A';
            report += '%0A'+'LISTA ESPULSI%20';
            if(Espulsi.length!==0)
                for (var i = 0 ; i < Espulsi.length; i++)
                    report +='%0A'+'All\''+ Espulsi[i].min+'%20'+'del%20'+Espulsi[i].tempo+'%20tempo%20'+'il numero%20'+Espulsi[i].calciatore+'%20dell\''+Espulsi[i].squadra+'%20per%20'+Espulsi[i].causale;
            else
                report += '%0A'+'Non ci sono state espulsioni!';

            report += '%0A%0A%0A';
            report += '%0A'+'Report RReferee';



            //report += '%0A'+episodi.get('episodi').length;
            /*Continua*/
            
            return report;
        }
    });

    return Match;
});


