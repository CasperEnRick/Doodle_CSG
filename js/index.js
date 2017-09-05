var csg = require('csg');
var { Viewer, addViewer } = require('./viewer');

var a = CSG.cube();
var b = CSG.cylinder({ slices: 8, start: new CSG.Vector(-1, 0, 0), end: new CSG.Vector(1, 0, 0) });
b = b.union(CSG.cylinder({ slices: 8, start: new CSG.Vector(0, -1, 0), end: new CSG.Vector(0, 1, 0) }));
b = b.union(CSG.cylinder({ slices: 8, start: new CSG.Vector(0, 0, -1), end: new CSG.Vector(0, 0, 1) }));
var c = CSG.cube({ radius: 0.5 });
var d = CSG.cylinder({ radius: 0.5, slices: 8, start: new CSG.Vector(-1, 0, 0), end: new CSG.Vector(-0.5, 0, 0) });
d = d.union(CSG.cylinder({ radius: 0.5, slices: 8, start: new CSG.Vector(0.5, 0, 0), end: new CSG.Vector(1, 0, 0) }));
d = d.union(CSG.cylinder({ radius: 0.5, slices: 8, start: new CSG.Vector(0, -1, 0), end: new CSG.Vector(0, -0.5, 0) }));
d = d.union(CSG.cylinder({ radius: 0.5, slices: 8, start: new CSG.Vector(0, 0.5, 0), end: new CSG.Vector(0, 1, 0) }));
d = d.union(CSG.cylinder({ radius: 0.5, slices: 8, start: new CSG.Vector(0, 0, -1), end: new CSG.Vector(0, 0, -0.5) }));
d = d.union(CSG.cylinder({ radius: 0.5, slices: 8, start: new CSG.Vector(0, 0, 0.5), end: new CSG.Vector(0, 0, 1) }));
a.setColor(1, 0, 0);
b.setColor(0, 0, 1);
c.setColor(0, 1, 0);
d.setColor(1, 1, 0);
var operations = [
  a,
  b,
  a.inverse(),
  b.inverse(),
  a.union(b),
  b.union(a),
  a.subtract(b),
  b.subtract(a),
  a.intersect(b),
  b.intersect(a),
  c,
  d,
  c.inverse(),
  d.inverse(),
  c.union(d),
  d.union(c),
  c.subtract(d),
  d.subtract(c),
  c.intersect(d),
  d.intersect(c)
];

Viewer.lineOverlay = true;

for (var i = 0; i < operations.length; i++) {
  addViewer(new Viewer(operations[i], 250, 250, 5));
}
