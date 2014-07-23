define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RR = {};

    RR.getNextId = function(){

		var ids = this.getMatchesIds();
		if(ids.length === 0)
			return 1;

		var maxId = _.max(ids);
		return maxId + 1;
    };

    RR.getMatchesIds = function(){

		var s =localStorage.getItem('RR-Ids');
		if(s === null)
			return [];
		var ids = JSON.parse(s);
		return ids;
	};

	RR.getMatch = function(id){
		var json = localStorage.getItem('Match-'+id);

		return JSON.parse(json);
	};

	RR.getMatches = function(){

		var matches = [];
		var ids = this.getMatchesIds();

		for (var i = 0; i < ids.length; i++) {
			var match = this.getMatch(ids[i]);
			matches.push(match);
		}

		return matches;

	};

	RR.create= function(model){
		var id = this.getNextId();
		model.set('id' , id);
		var json = JSON.stringify(model);

		localStorage.setItem('Match-'+id , json);
		
		var ids = this.getMatchesIds();
		ids.push(id);

		localStorage.setItem('RR-Ids', JSON.stringify(ids));

		return id;
	};

	RR.update = function(model){
		var id = model.get('id');
		var json = JSON.stringify(model);

		localStorage.setItem('Match-'+id , json);

	};

	RR.delete = function(model){

		var id = model.get('id');
		localStorage.removeItem('Match-'+id );
		var ids = this.getMatchesIds();
		ids = _.without(ids , id);
		localStorage.setItem('RR-Ids', JSON.stringify(ids));
	};


	RR.read = function(model){
		var id = model.get('id');

		var json = localStorage.getItem('Match-'+id );

		return JSON.parse(json);
	};

    return RR;
});
