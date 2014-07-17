define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var Episodio = Backbone.Model.extend({
        constructorName: "Episodio",


        sync : function(method , model ){
            if(method === 'create')
                model.trigger('save');
        }


    });

    return Episodio;
});


