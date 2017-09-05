var csg = require('csg');
var { Viewer } = require('./viewer');
var State = require('./state');

var WIDTH = 720;
var HEIGHT = 480;

var state = new State({
  cylinders: [],
  eraseCylinders: []
});

var canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.getElementById('d2').appendChild(canvas);
var context = canvas.getContext('2d');

state.addListener(function(state) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < state.cylinders.length; i ++) {
    context.fillStyle = 'blue';
    var cylinder = state.cylinders[i];
    context.beginPath();
    context.arc(cylinder.x, cylinder.y, cylinder.radius, 0, Math.PI * 2, false);
    context.fill();
  }

  for (let i = 0; i < state.eraseCylinders.length; i ++) {
    var cylinder = state.eraseCylinders[i];
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(cylinder.x, cylinder.y, cylinder.radius, 0, Math.PI * 2, false);
    context.fill();
  }
});


canvas.onmousemove = function(mouse) {
  if (mouse.which & 1) {
    state.update(function(state) {
      if (mouse.shiftKey) {
        state.eraseCylinders.push({
          x: mouse.x,
          y: mouse.y,
          radius: 20,
          height: 10
        });
      } else {
        state.cylinders.push({
          x: mouse.x,
          y: mouse.y,
          radius: 20,
          height: 20
        });
      }
      return state;
    });
  }
}


var viewer = new Viewer(new CSG(), WIDTH, HEIGHT, 80);
document.getElementById('d3').appendChild(viewer.gl.canvas);

state.addListener(function(state) {
  var csg = new CSG();

  var halfWidth = WIDTH / 2;
  var halfHeight = HEIGHT / 2;

  for (let i = 0; i < state.cylinders.length; i ++) {
    var cylinderData = state.cylinders[i];
    var x = cylinderData.x - halfWidth;
    var y = cylinderData.height;
    var z = cylinderData.y - halfHeight;
    var cylinderCSG = CSG.cylinder({
      slices: 20,
      start: new CSG.Vector(x, 0, z),
      end: new CSG.Vector(x, y, z),
      radius: cylinderData.radius
    });

    csg = csg.union(cylinderCSG);
  }

  for (let i = 0; i < state.eraseCylinders.length; i ++) {
    var cylinderData = state.eraseCylinders[i];
    var x = cylinderData.x - halfWidth;
    var y = cylinderData.height;

    var z = cylinderData.y - halfHeight;
    var cylinderCSG = CSG.cylinder({
      slices: 20,
      start: new CSG.Vector(x, 0, z),
      end: new CSG.Vector(x, y, z),
      radius: cylinderData.radius
    });

    csg = csg.subtract(cylinderCSG);
  }

  viewer.mesh = csg.toMesh();
  viewer.gl.ondraw();
});
