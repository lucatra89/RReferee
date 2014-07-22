/* 
Per fare le prove utilizzate il modello in questo modo:

var match = new Match(model);

Esempi di utilizzo :
	
	- match.get('locali');
	- match.get('colore');

Attenzione al caso al seguente caso :
	
	match.get('episodi');

Questo non restituirà un array di episodi , ma una collection , quindi :

	match.get('episodi')[0]			ERRATO !
	match.get('episodi').at(0)		CORRETTO!

*/


var model = {
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
    data: "21/06/2014",
    orario: "13:00", //orario ufficiale
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

    episodi: [
			{
				min: 54,
				tempo: 1,
				tipo: "ammonizione",
				causale: "fallo",
				calciatore: 10,
				squadra :"locali"
			},

			{
				min: 54,
				tempo: 2,
				tipo: "espulsione",
				causale: "doppia ammonizione",
				calciatore: 10,
				squadra :"ospiti"
			},

			{
				min: 54,
				tempo: 2,
				tipo: "gol",
				rigore: false,
				calciatore: 10,
				squadra :"locali"
			},

			{
				min: 32,
				tempo: 1,
				tipo: "sostituzione",
				entra : 7,
				esce : 10,
				squadra :"ospiti"
			},

			{
				tipo : 'fallo',
				min : 15,
				tempo: 1,
				squadra: "locali"
			}

    ]

};