const NodeHookAddon = require('bindings')('node-ghk');
const events = require('events');

class GHK extends events.EventEmitter {

  constructor() {
    super();
    this.status = 'stopped';
    this.dispatch = this.dispatch.bind(this);
  }


  dispatch(msg) {
    if (this.status === 'paused') return;
    switch (msg.type) {
      case 3:
        this.emit('keypress', msg);
        break;
      case 7:
        this.emit('mousedown', msg);
        break;
      case 8:
        this.emit('mouseup', msg);
        break;
      case 9:
        this.emit('mousemove', msg);
        break;
      case 10:
        this.emit('mousedrag', msg);
        break;
      case 11:
        this.emit('mousewheel', msg);
        break;
      case undefined:
        break;
      default:
    }
  }

  start() {
    if (this.status === 'stopped') {
      NodeHookAddon.start_hook(this.dispatch);
      this.status = 'started';
    }
  }

  pause() {
    this.status = 'paused';
  }

  resume() {
    this.status = 'started';
  }

  stop() {
    NodeHookAddon.stop_hook();
  }

}

module.exports = GHK;
