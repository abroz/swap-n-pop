module.exports = function(game){
  const {
    COLS,
    ROWS,
    UNIT,
    STARTPOS_PANELCURSOR_SPEED
  } = require('./../core/data')
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.entrance = this.entrance.bind(this);
      this.map_controls = this.map_controls.bind(this);
      this.pause = this.pause.bind(this);
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.left = this.left.bind(this);
      this.right = this.right.bind(this);
      this.swap = this.swap.bind(this);
      this.can_push = this.can_push.bind(this);
      this.update = this.update.bind(this);
      this.shutdown = this.shutdown.bind(this);
    }

    create(playfield,opts){
      this.playfield = playfield;
      if (opts == null) { opts = {}; }
      this.state      = 'hidden';
      this.sfx_select = game.add.audio('sfx_select');

      this.counter_flicker = 0;
      this.counter         = 0;
      this.x = 2;
      this.y = 6;

      // center the cursor
      this.ai = opts.ai || false;

      const diff = (UNIT / 16) * 3;
      this.sprite = game.make.sprite(((COLS-2)*UNIT)-diff, 0-diff, 'playfield_cursor', 0);
      this.sprite.animations.add('idle', [0,1]);
      this.sprite.animations.play('idle', Math.round(game.time.desiredFps / 10), true);
      this.sprite.visible = false;

      return this.playfield.layer_cursor.add(this.sprite);
    }
    entrance() {
      this.sprite.visible = true;
      return this.state          = 'entering';
    }
    map_controls() {
      return game.controls.map(this.playfield.pi, {
        up   : this.up,
        down : this.down,
        left : this.left,
        right: this.right,
        a    : this.swap,
        b    : this.swap,
        start: this.pause
      }
      );
    }
    pause() {
      return this.playfield.stage.pause(this.playfield.pi);
    }
    up() {
      this.sfx_select.play();
      if (this.y > 0) { return this.y--; }
    }
    down() {
      this.sfx_select.play();
      if (this.y < (ROWS - 1)) { return this.y++; }
    }
    left() {
      this.sfx_select.play();
      if (this.x > 0) { return this.x--; }
    }
    right() {
      this.sfx_select.play();
      if (this.x < (COLS - 2)) { return this.x++; }
    }
    swap() {
      if (!this.playfield.running || (this.state !== 'active')) { return; }
      return this.playfield.swap(this.x, this.y);
    }
    can_push() {
      return (game.controls.keys[`pl${this.playfield.pi}_l`].isDown ||
      game.controls.keys[`pl${this.playfield.pi}_r`].isDown) &&
      this.playfield.running &&
      (this.state === 'active');
    }
    update() {
      let diff = (UNIT / 16) * 3;
      let y    = this.playfield.should_push ? this.y : this.y+1;
      const x    = (this.x * UNIT) - diff;
      y    = (y * UNIT)  - diff;
      
      if ((this.state === 'entering') || (this.state === 'preactive')) {
        this.counter_flicker++;
        if (this.counter_flicker > 1) {
          this.counter_flicker = 0;
          this.sprite.visible = !this.sprite.visible;
        }
      }
      switch (this.state) {
        case 'entering':
          if (this.sprite.y < y) {
            return this.sprite.y += STARTPOS_PANELCURSOR_SPEED;
          } else if (this.sprite.x > x) {
            return this.sprite.x -= STARTPOS_PANELCURSOR_SPEED;
          } else {
            this.state = 'preactive';
            if (this.ai === false) { return this.map_controls(); }
          }
          break;
        case 'preactive': case 'active':
          diff = (UNIT / 16) * 3;
          y = this.playfield.should_push ? this.y : this.y+1;
          this.sprite.x = (this.x * UNIT) - diff;
          return this.sprite.y = (y * UNIT)  - diff;
      }
    }
    shutdown() {
      return console.log('shutdown cursor');
    }
  }
  return controller
}
