'use strict';
/* global $:false */
var ColorScheme = function(){

  Object.defineProperties( this, {
    
    basic : {
      value : { text : '#fff', off : '#161616', lights : [ '#004358', '#1F8A70', '#BEDB39','#FFE11A', '#FD7400' ]},
      enumerable : true
    },

    vitaminC : {
      value : { text : '#fff', off : '#161616', lights : [ '#004358', '#1F8A70', '#BEDB39','#FFE11A', '#FD7400' ] },
      enumerable : true
    },

    oceanSunset : {
      value : { text : '#fff', off : '#161616', lights : ['#405952', '#9C9B7A', '#FFD393', '#FF974F', '#F54F29']},
      enumerable : true
    },

    kulerDj : {
      value : { text : '#fff', off : '#333333', lights : ['#CF066B', '#009ACD', '#30CD00'] },
      enumerable : true
    }
  });
};

// Light Object
var Light = function( optionData, coordinates ){

  var el = $('<li>').addClass('square');



  Object.defineProperties( this, {

    el : {
      value : el,
      enumerable : true,
    },

    on : {
      value : false,
      enumerable : true,
      writable : true
    },

    colorScheme : {
      value : optionData.colorScheme,
      enumerable : true,
      writable : true
    },

    colorIndex : {
      value : 0,
      writable : true,
      enumerable : true
    },

    coordinates : {
      value : coordinates,
      enumerable : true
    },

    currentNumber : {
      value : 0,
      writable : true,
      enumerable : true
    }
  });

  this.el
    .css({
      'background-color' : this.colorScheme.off,
      'color' : this.colorScheme.text
    })
    .data( 'light', this )
    .html( this.currentNumber );
};

// Light Methods
Object.defineProperties( Light.prototype, {
  
  toggle : {
    value : function(){
      if( this.on ){
        this.on = false;
      } else {
        this.on = true;
      }
    }
  },

  setColor : {
    value : function(){
      if( this.on ){
        this.changeColor();
      } else {
        this.el.css('background-color', this.colorScheme.off );
      }
    }
  },

  changeColor : {
    value : function(){
      if( this.colorIndex < this.colorScheme.lights.length - 1 ){
        this.colorIndex++;
      } else {
        this.colorIndex = 0;
      }
      this.el.css('background-color', this.colorScheme.lights[ this.colorIndex ]);
    }
  },

  incrementNumber : {
    value : function(){
      if( this.currentNumber < this.colorScheme.lights.length - 1 ){
        this.currentNumber++;
      } else {
        this.currentNumber = 0;
      }
      
      this.el.html( this.currentNumber );
    }
  }
});