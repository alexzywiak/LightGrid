'use strict';
/* global $:false */

// Light Object
var Light = function( optionData, coordinates ){

  var el = $('<button>')
    .addClass('square');

  Object.defineProperties( this, {

    el : {
      value : el,
      enumerable : true,
    },

    colorScheme : {
      value : [ '#004358', '#1F8A70', '#BEDB39','#FFE11A', '#FD7400' ],
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
      'background-color' : this.colorScheme[ this.colorIndex ]
    })
    .data( 'light', this )
    .html( this.currentNumber );
};

// Light Methods
Object.defineProperties( Light.prototype, {

  changeColor : {
    value : function(){
      if( this.colorIndex < this.colorScheme.length - 1 ){
        this.colorIndex++;
      } else {
        this.colorIndex = 0;
      }
      this.el.css('background-color', this.colorScheme[ this.colorIndex ]);
    }
  },

  incrementNumber : {
    value : function(){
      if( this.currentNumber < this.colorScheme.length - 1 ){
        this.currentNumber++;
      } else {
        this.currentNumber = 0;
      }
      
      this.el.html( this.currentNumber );
    }
  }
});