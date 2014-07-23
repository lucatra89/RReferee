define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var MatchView = require('views/listItem/MatchView');
    var ToolsView = require('views/subviews/ToolsView');
    var DashboardView = require('views/subviews/DashboardView');

    var VisioView = Backbone.View.extend({

        constructorName: "VisioView",

        initialize: function() {

            this.template = Utils.templates.visio;
            this.subViews = [];

        },

        render: function() {

            var vToolsL = new ToolsView();
            var vToolsR = new ToolsView();
            var vDashboard = new DashboardView();

            this.subViews.push(vToolsL);
            this.subViews.push(vToolsR);
            this.subViews.push(vDashboard);

            this.setElement(this.template());

            var toolsLeft = _.find(this.$el, function(el) {
                return $(el).hasClass('tools-l');
            });
            var toolsRight = _.find(this.$el, function(el) {
                return $(el).hasClass('tools-r');
            });

            var dashboard = _.find(this.$el, function(el){
              return $(el).hasClass('pith');
            }).querySelector('.top');



            $(toolsLeft).append(vToolsL.render().$el);
            $(toolsRight).append(vToolsR.render().$el);
            $(dashboard).append(vDashboard.render().$el);


            this.listenTo(vToolsL, 'episodio', this.manageEpisodioLocali);
            this.listenTo(vToolsR, 'episodio', this.manageEpisodioOspiti);

            return this;
        },


        manageEpisodioLocali: function(json){

          json.team = 'locali';
          console.log(json);
        },

        manageEpisodioOspiti: function(json){

          json.team = 'ospiti';
          console.log(json);

        }


    });

    return VisioView;
});