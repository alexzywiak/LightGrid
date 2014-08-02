'use strict';
/* global $:false */
/* global EventTarget:false */
/* global Light:false */

var lightGrid = (function( lightGrid ){

  var funkyMonkey = function(){
    console.log( this );
  };

  // Calls light constructor function to create light objects
  // Accepts an Option object
  var createLightObjectArray = function( optionData ){

    var grid = [],
        size = optionData.size;

    for( var y = 0; y < size; y++ ){
      grid.push([]);
      for( var x = 0; x < size; x++ ){
        var light = new Light( optionData, { x : x, y : y } );
        grid[y].push( light );
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

    EventTarget.call( this );

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

    var grid = this;
  
    this.el.on('click', function(e){

      var light = $(e.target).data('light');
      
      if( typeof light === 'undefined' ){
        return;
      }

      light.incrementNumber();
      //Light.prototype.incrementNumber.call( light );

      for( var y = 0, yLen = grid.lights.length; y < yLen; y++ ){
        
        var thisRow = grid.lights[y];

        for( var x = 0, xLen = thisRow.length; x < xLen; x++ ){
          // if ( thisRow[x].coordinates.x === light.coordinates.x || thisRow[x].coordinates.y === light.coordinates.y ){
          //   thisRow[x].changeColor();
          // }
          if( thisRow[x].currentNumber === light.currentNumber ){
            thisRow[x].changeColor();
          }
        }
      }

      document.onselectstart = function() { return false; };
    });
  };

  // Grid Methods
  Grid.prototype = Object.create( EventTarget.prototype, {

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