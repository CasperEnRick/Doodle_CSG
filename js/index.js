var csg = require('csg');
var { Viewer } = require('./viewer');
var State = require('./state');

var state = new State();

var canvas = document.createElement('canvas');
canvas.width = 720;
canvas.height = 480;
document.getElementById('d2').appendChild(canvas);
var context = canvas.getContext('2d');

state.addListener(function(state) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < state.cylinders.length; i ++) {
    var cylinder = state.cylinders[i];
    context.beginPath();
    context.arc(cylinder.x, cylinder.y, 10, 0, Math.PI * 2, false);
    context.fill();
  }
});


canvas.onmousemove = function(mouse) {
  if (mouse.which & 1) {
    state.update(function(state) {
      state.cylinders.push({
        x: mouse.x,
        y: mouse.y
      })

      return state;
    });
  }
}


var cylinder = CSG.cylinder({ slices: 20, start: new CSG.Vector(0, 0, 0), end: new CSG.Vector(0, 1, 0) });

// Viewer.lineOverlay = false;

var viewer = new Viewer(cylinder, 720, 480, 10);
document.getElementById('d3').appendChild(viewer.gl.canvas);
