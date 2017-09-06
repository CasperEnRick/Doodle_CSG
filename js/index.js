var csg = require('csg');
var { Viewer } = require('./viewer');
var State = require('./state');


var WIDTH = 720;
var HEIGHT = 480;

var state = window.state = new State({
  // cylinders: [],
  // eraseCylinders: []
  csg: new CSG()
});

var canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.getElementById('d2').appendChild(canvas);
var context = canvas.getContext('2d');

state.addListener(function(state) {
  // no feedback in 2D yet
});


canvas.onmousemove = function(mouse) {
  var offsetTop = document.getElementById('d2').offsetTop;

  if (mouse.which & 1) {
    state.update(function(state) {

      //create cylinder
      var halfWidth = WIDTH / 2;
      var halfHeight = HEIGHT / 2;
      var x = mouse.x - halfWidth;
      var y = 10;
      var z = mouse.y - halfHeight;
      var cylinderCSG = CSG.cylinder({
        slices: 20,
        start: new CSG.Vector(x, 0, z),
        end: new CSG.Vector(x, y, z),
        radius: 20
      });

      //union or subtract cylinder from csg
      if (mouse.shiftKey) {
        state.csg = state.csg.subtract(cylinderCSG);
      } else {
        state.csg = state.csg.union(cylinderCSG);
      }
      return state;
    });
  }
}

var viewer = new Viewer(new CSG(), WIDTH, HEIGHT, 500);
document.getElementById('d3').appendChild(viewer.gl.canvas);

state.addListener(function(state) {
  viewer.mesh = state.csg.toMesh();
  viewer.gl.ondraw();
});
