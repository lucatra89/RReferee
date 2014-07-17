define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Match = require("models/Match");

	var Matches = Backbone.Collection.extend({
		constructorName: "Matches",
		model: Match,

		getMatchById :function(id){
			return this.findWhere('id' , id);
		}
	});

	return Matches;
});