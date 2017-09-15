module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const ComponentMenuPauseCursor = require(APP.path.components('menu_pause_cursor'))(game)
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.cancel = this.cancel.bind(this);
      this.contiune = this.contiune.bind(this);
      this.pause = this.pause.bind(this);
      this.update = this.update.bind(this);
      this.cursor = new ComponentMenuPauseCursor();
    }
    create(playfield){
      this.playfield = playfield;
      this.paused = false;
      this.sprite = game.add.sprite(this.playfield.x+4, 100, 'menu_pause');
      this.sprite.visible = false;
      return this.cursor.create(this, 8, 8, [
        this.contiune,
        this.cancel
      ]);
    }
    cancel() {
      this.paused = false
      console.log('cancel')
      game.state.start('menu')
    }
    contiune() {
      this.paused         = false
      this.sprite.visible = false
      this.playfield.stage.resume(this.playfield.pi)
    }
    pause(pi){
      this.paused         = true;
      if (this.playfield.pi === pi) {
        this.sprite.visible = true
        this.cursor.map_controls()
      } else {
        game.controls.map(this.playfield.pi, {}); //disable controls
      }
    }
    update() {
      if (!this.paused) { return; }
      this.cursor.update();
    }
  }

  return controller
}
