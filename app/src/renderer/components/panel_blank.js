module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {STATIC}  = require(APP.path.core('data'))
  return {
    [Symbol.toStringTag]: 'PanelBlank',
    kind                : null,
    x                   : null,
    y                   : null,
    state               : STATIC,
    counter             : 0,
    animation_state     : null,
    animation_counter   : 0,
    comboable           : false,
    support             : true,
    empty               : false
  }
}
