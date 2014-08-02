'use strict';

var EventTarget = function(){
  // listeners property
  Object.defineProperty( this, '__listeners', {
    value : {}
  });
};

// Methods

Object.defineProperties( EventTarget.prototype, {

  addListener : {
    
    value : function( type, action ){

      // Create if doesn't exist
      if( typeof this.__listeners[type] === 'undefined' ){
        this.__listeners[type] = [];
      }
      this.__listeners[type].push( action );
    }
  },

  removeListener : {

    value : function( type, action ){

      if( typeof this.__listeners[type] === 'undefined' ){
        return;
      }

      var listeners = this.__listeners[type];

      for( var i = 0, len = listeners.length; i < len; i++ ){
        if( action === listeners[i] ){
          listeners.splice( i, 1 );
        }
      }
    }
  },

  __fire : {

    value : function( evtObj ){

      if( typeof evtObj.type === 'undefined' ){
        throw new Error( 'You gotta have a type bro' );
      }

      var listeners = this.__listeners[ evtObj.type ];

      if( typeof listeners === 'undefined' ){
        return;
      }

      for( var i = 0, len = listeners.length; i < len; i++ ){
        listeners[i].call( this, evtObj );
      }
    }
  }
});
// Add listeners

// Remove listeners

// __fire