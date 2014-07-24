define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    className : "app",

    events: {
      "tap #binfo" : 'showInfo',
      "touchstart #binfo": 'onTouchstart',
      "touchend #binfo": 'onTouchend'
    },

    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.structure;
      this.on("inTheDOM", this.rendered);
      this.on('showBinfo', this.showBinfo);
      this.on('hideBinfo', this.hideBinfo);
      this.on('handleClose', this.handleClose);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content');
      this.leftButton = this.el.querySelector('#bclose');
      this.rightButton = this.el.querySelector('#binfo');

      return this;
    },

    showInfo: function(){
      this.trigger('showInfo');
    },

    onTouchstart: function(){
      this.rightButton.style.backgroundColor = 'white';
      this.rightButton.style.color = 'black';
    },

    onTouchend: function(){
      this.rightButton.style.backgroundColor = '';
      this.rightButton.style.color = '';
    },

    showBinfo: function(){
      this.rightButton.classList.add('visible');
    },

    hideBinfo: function(){
      this.rightButton.classList.remove('visible');
    },

    handleClose: function(handle){
      this.leftButton.addEventListener('touchend', handle);
    }



  });

  return StructureView;

});