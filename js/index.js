var csg = require('csg');
var { Viewer } = require('./viewer');

var cylinder = CSG.cylinder({ slices: 20, start: new CSG.Vector(0, 0, 0), end: new CSG.Vector(0, 1, 0) });

// Viewer.lineOverlay = false;

var viewer = new Viewer(cylinder, 720, 480, 10);
document.getElementById('3d').appendChild(viewer.gl.canvas);
