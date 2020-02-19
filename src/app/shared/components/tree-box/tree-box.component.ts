import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

export interface TreeData {
  name: string,
  children: TreeData[],
  data: {
    owner: string,
    owner_nic: string,
    extent: number,
    surveyor_id: string,
    notary_id: string,
  },
  timestamp: number
}

@Component({
  selector: 'app-tree-box',
  templateUrl: './tree-box.component.html',
  styleUrls: ['./tree-box.component.css']
})
export class TreeBoxComponent implements OnInit {

  @Input() treeData: TreeData;

  constructor() { }

  margin = null;
  width = null;
  height = null;

  i = 0;
  duration = 750;
  root = null;

  treemap = null;
  svg = null;
  tooltip = null;

  ngOnInit() {
    if (this.treeData != null) {
      let x = this.maxDepth(this.treeData, 0);
      if (x < 2) x = 3;

      this.margin = { top: 50, right: 90, bottom: 30, left: 90 };
      this.width = x * 200 - this.margin.left - this.margin.right;
      this.height = x * 150 - this.margin.top - this.margin.bottom;

      this.treemap = d3.tree().size([this.height, this.width]);

      this.tooltip = d3.select("#tool-tip").append("div")
        .attr("class", "tooltipx")
        .style("opacity", 0);

      this.svg = d3.select("#tree-box").append("svg")
        .attr("width", this.width + this.margin.right + this.margin.left)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      this.root = d3.hierarchy(this.treeData, function (d: any) { return d.children; });
      this.root.x0 = this.height / 2;
      this.root.y0 = 0;

      this.update(this.root);
      // d3.select(self.frameElement).style("height", "300px");
    }
  }

  update(source: any) {
    // Assigns the x and y position for the nodes
    let treeData = this.treemap(this.root);

    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) { d.y = d.depth * 120 });

    // ****************** Nodes section ***************************

    // Update the nodes...
    let node = this.svg.selectAll('g.node').data(nodes, (d: any) => { return d.id || (d.id = ++this.i) });

    // Enter any new modes at the parent's previous position.
    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })
      .on('click', (d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        this.update(d);
      });

    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      });

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function (d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function (d) { return d.data.name; });

    nodeEnter.on("mouseover", (d, i) => {
      this.tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      this.tooltip.html(
        "<b>Owner : </b><i>" + d.data.data.owner + " (" + d.data.data.owner_nic + ")<br></i>" +
        "<b>Extent : </b><i>" + d.data.data.extent + "<br></i>" +
        "<b>Surveyor ID : </b><i>" + d.data.data.surveyor_id + "<br></i>" +
        "<b>Notary ID : </b><i>" + d.data.data.notary_id + "<br></i>" +
        "<b>Timestamp : </b><i>" + d.data.timestamp + "</i>")
        .style("left", (d3.event.pageX - 240) + "px")
        .style("top", (d3.event.pageY - 180) + "px");
    });

    nodeEnter.on("mouseout", (d, i) => {
      this.tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    })

    // UPDATE
    let nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(this.duration)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');

    // Remove any exiting nodes
    let nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = this.svg.selectAll('path.link')
      .data(links, function (d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function (d) {
        var o = { x: source.x0, y: source.y0 }
        return diagonal(o, o)
      });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', function (d) { return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function (d) {
        var o = { x: source.x, y: source.y }
        return diagonal(o, o)
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function (d: any) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      let path = `M ${s.x} ${s.y}
            C ${(s.x + d.x) / 2} ${s.y},
              ${(s.x + d.x) / 2} ${d.y},
              ${d.x} ${d.y}`
      return path
    }
  }

  maxDepth(data: any, num: number = 0) {
    if (data.children == null || data.children == undefined) {
      return 0;
    }
    if ((data.children[0] == null || data.children[0] == undefined) && (data.children[1] == null || data.children[1] == undefined)) {
      return num;
    }
    if ((data.children[0] != null || data.children[0] != undefined) && (data.children[1] != null || data.children[1] != undefined)) {
      return Math.max(this.maxDepth(data.children[0], num + 1), this.maxDepth(data.children[1], num + 1));
    } else if (data.children[0] != null || data.children[0] != undefined) {
      return this.maxDepth(data.children[0], num + 1);
    } else if (data.children[1] != null || data.children[1] != undefined) {
      return this.maxDepth(data.children[1], num + 1);
    }
  }
}
