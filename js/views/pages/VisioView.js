define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var MatchView = require('views/listItem/MatchView');
    var ToolsView = require('views/subviews/ToolsView');
    var DashboardView = require('views/subviews/DashboardView');
    var InfoView = require('views/subviews/InfoView');
    var EpisodioView = require('views/listItem/EpisodioView');

    var VisioView = Backbone.View.extend({

        constructorName: "VisioView",

        initialize: function() {

            this.template = Utils.templates.visio;
            this.subViews = [];

            this.on('exit', this.exit);
        },

        render: function() {

            var vToolsL = new ToolsView();
            var vToolsR = new ToolsView();
            var vDashboard = new DashboardView({model:this.model});
            var vInfo = new InfoView({model: this.model});

            this.subViews.push(vToolsL);
            this.subViews.push(vToolsR);
            this.subViews.push(vDashboard);
            this.subViews.push(vInfo);

            this.setElement(this.template(this.model.toJSON()));

            var toolsLeft = _.find(this.$el, function(el) {
                return $(el).hasClass('tools-l');
            });
            var toolsRight = _.find(this.$el, function(el) {
                return $(el).hasClass('tools-r');
            });

            var dashboard = this.$el.find('#dashboard');

            this.info = _.find(this.$el, function(el){
                return el.id == 'info';
            });


            $(toolsLeft).append(vToolsL.render().$el);
            $(toolsRight).append(vToolsR.render().$el);
            dashboard.append(vDashboard.render().$el);

            this.info.appendChild(vInfo.render().el);
            this.episodi = this.$el.find('#episodi')[0];


            this.listenTo(vToolsL, 'episodio', this.manageEpisodioLocali);
            this.listenTo(vToolsR, 'episodio', this.manageEpisodioOspiti);
            this.listenTo(vDashboard, 'episodio', this.manageEpisodio);
            this.listenTo(vInfo , 'focus', this.onFocus);
            this.listenTo(vInfo , 'close', this.onCloseInfo);

            this.on('showInfo', this.showInfo);

            return this;
        },


        manageEpisodioLocali: function(json){

          json.squadra = 'locali';
          json.colore = this.model.get('coloreLocali');
          json.min = this.model.get('min');
          json.tempo = this.model.get('tempo');

          if (json.tipo === 'gol') {
            var gol = this.model.get('golLocali');
            this.model.set('golLocali', ++gol);
          }
          var model = this.model.get('episodi').create(json);
          var view = new EpisodioView({model: model});
          this.episodi.insertBefore(view.render().el, this.episodi.childNodes[0]);

        },

        manageEpisodioOspiti: function(json){

          json.squadra = 'ospiti';
          json.colore = this.model.get('coloreOspiti');
          json.min = this.model.get('min');
          json.tempo = this.model.get('tempo');

          if (json.tipo === 'gol') {
            var gol = this.model.get('golOspiti');
            this.model.set('golOspiti', ++gol);
          }

          var model = this.model.get('episodi').create(json);
          var view = new EpisodioView({model: model});
          this.episodi.insertBefore(view.render().el, this.episodi.childNodes[0]);

        },
        manageEpisodio: function(json){
          json.min = this.model.get('min');
          json.tempo = this.model.get('tempo');
          
          var model = this.model.get('episodi').create(json);
          var view = new EpisodioView({model: model});
          this.episodi.insertBefore(view.render().el, this.episodi.childNodes[0]);
        },
        onFocus : function(){
            this.info.classList.add('focus');
        },

        onCloseInfo : function(){
            this.info.classList.remove('focus');
            this.info.classList.remove('visible');
        },

        showInfo: function(){
            this.info.classList.add('visible');
        },

        exit : function(){
            Backbone.history.navigate('home', {trigger:true});
            this.model.destroy();
        }

    });

    return VisioView;
});