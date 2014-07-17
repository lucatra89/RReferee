define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Episodio = require("models/Episodio");

	var Episodi = Backbone.Collection.extend({
		constructorName: "Episodi",
		model: Episodio,

		getEpisodiByTipo :function(tipo){
			return this.where('tipo' , tipo);
		}
	});

	return Episodi;
});