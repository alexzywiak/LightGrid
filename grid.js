'use strict';
/* global $:false */

var lightGrid = (function( lightGrid ){

  // Calls light constructor function to create light objects
  // Accepts an Option object
  var createLightObjectArray = function( optionData ){

    var grid = [],
        size = optionData.size;

    for( var y = 0; y < size; y++ ){
      grid.push([]);
      for( var x = 0; x < size; x++ ){
        grid[y].push( new Light( optionData, { x : x, y : y } ) );
      }
    }
    return grid;
  };

  var appendLightObjectArray = function( grid ){

    var output = $('<div>'),
        list   = [];

    for( var y = 0, yLen = grid.length; y < yLen; y++ ){
      
      output.append('<ul>');
      list = output.children('ul');

      for( var x = 0, xLen = grid[y].length; x < xLen; x++ ){
        
        var light = grid[y][x].el;
        light.appendTo( $( list[y] ) );
      }
    }
    return output;
  };

  // Light Object
  var Light = function( optionData, coordinates ){

    var el = $('<li>')
      .addClass('light');

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
      }
    });

    this.el.css('background-color', this.colorScheme[ this.colorIndex ]);

    var lightObj = this;

    this.el.on('click', function(){
      lightObj.changeColor();
    });
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
    }
  });

  // Grid optionData Object
  
  var OptionData = function(){

    Object.defineProperties( this, {

      size : {
        value : ( this.size || 4 ),
        enumerable : true
      },

      colorScheme : {
        value : ( this.colorScheme || 'default' ),
        enumerable : true,
        writable : true
      }
    });
  };

  var Grid = function( el, optionData ){

    Object.defineProperties( this, {

      el : {
        value : el
      },

      optionData : {
        value : optionData
      },

      lights :{
        value : createLightObjectArray( optionData )
      }
    });
  };

  // Grid Methods
  Object.defineProperties( Grid.prototype, {

    append : {
      value : function( parentElement ){
        this.el.append( appendLightObjectArray( this.lights ) );
        $( this.el ).appendTo( parentElement );
      }
    }
  });


  lightGrid.createGrid = function( elementId, optionData ){

    var gridEl = $( elementId );

    if( typeof optionData === 'undefined' ){
      optionData = new OptionData();
    } else {
      OptionData.call( optionData );
    }

    // Create a new DOM element if elementId doesn't already exist
    
    if( gridEl.length === 0 ){
      gridEl = $( '<div>' )
        .attr( 'id', elementId.split('#')[1] );
    }

    return new Grid( gridEl, optionData );
  };

  return lightGrid;

})( lightGrid || {} );