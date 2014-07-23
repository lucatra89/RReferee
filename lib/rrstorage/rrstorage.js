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
		return s;
	};


	RR.create= function(model){
		var id = this.getNextId();
		var json = JSON.stringify(model);

		localStorage.setItem('Match-'+id , json);
	};

	RR.update = function(model){
		var id = model.get('id');
		var json = JSON.stringify(model);

		localStorage.setItem('Match-'+id , json);

	};

	RR.delete = function(model){
		var id = model.get('id');

		localStorage.removeItem('Match-'+id );

	};


	RR.read = function(model){
		var id = model.get('id');

		var json = localStorage.getItem('Match-'+id );

		return JSON.parse(json);
	};

    return RR;
});
