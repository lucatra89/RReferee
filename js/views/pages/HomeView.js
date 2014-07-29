define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var MatchView = require('views/listItem/MatchView');

    var HomeView = Backbone.View.extend({

        constructorName: "HomeView",

        className: "BodyHome",

        events: {
            'tap #crea': 'goToCreazione'
        },

        initialize: function() {
            this.template = Utils.templates.home;
        },

        render: function() {
            var self = this;
            this.el.innerHTML = this.template();

            this.model.each(function(model) {
                var newItem = new MatchView({
                    model: model
                });
                self.el.appendChild(newItem.render().el);
            });
            return this;
        },

        goToCreazione: function() {
            Backbone.history.navigate('creazione', {trigger: true});
            document.body.scrollLeft = 0;

        }


    });

    return HomeView;
});