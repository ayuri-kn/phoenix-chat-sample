// -- socket connection --
import { Socket } from "phoenix"

let socket = new Socket("/socket", { params: { token: window.userToken } })
socket.connect();
let channel = socket.channel("room:lobby", {})

channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
// -- socket connection --

var w = 640,
    h = 480;

var nodes = d3.range(200).map(function () { return { radius: Math.random() * 12 + 4 }; }),
    color = d3.scale.category10();

var force = d3.layout.force()
    .gravity(0.05)
    .charge(function (d, i) { return i ? 0 : -2000; })
    .nodes(nodes)
    .size([w, h]);

var root = nodes[0];
root.radius = 0;
root.fixed = true;
force.start();

var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
    .data(nodes.slice(1))
    .enter().append("svg:circle")
    .attr("r", function (d) { return d.radius - 2; })
    .style("fill", function (d, i) { return color(i % 3); });

force.on("tick", function (e) {
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;
    while (++i < n) {
        q.visit(collide(nodes[i]));
    }
    svg.selectAll("circle")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
});

svg.on("mousemove", function () {
    var p1 = d3.mouse(this);
    // root.px = p1[0];
    // root.py = p1[1];
    // force.resume();
    // -- websocket interaction --
    channel.push("move", { x: p1[0], y: p1[1] });
});

// -- websocket interaction --
channel.on("move", function (dt) {
    root.px = dt.x;
    root.py = dt.y;
    force.resume();
});

function collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
            var x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = node.radius + quad.point.radius;
            if (l < r) {
                l = (l - r) / l * .5;
                node.x -= x *= l;
                node.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
            }
        }
        return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
    };
}

