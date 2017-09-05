function State(state) {
  this._state = state || {};
  this._listeners = [];
}
State.prototype.addListener = function(listener) {
  this._listeners.push(listener);
}
State.prototype.update = function(update) {
  this._state = update(this._state);
  for (var i = 0; i < this._listeners.length; i ++) {
    var listener = this._listeners[i];
    listener(this._state);
  }
}

module.exports = State;
