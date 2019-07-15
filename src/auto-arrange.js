export class AutoArrange {
  constructor(editor, margin, depth) {
    this.editor = editor;
    this.margin = margin;
    this.depth = depth;
  }

  getNodes(node, type = 'output') {
    const nodes = [];
    const key = `${type}s`;

    for (let io of node[key].values())
      for (let connection of io.connections.values())
        nodes.push(connection[type === 'input' ? 'output' : 'input'].node);

    return nodes;
  }

  getNodesTable(node, cols = [], depth = 0) {
    if (this.depth && depth > this.depth) return;
    if (!cols[depth]) cols[depth] = [];
    if (cols[depth].includes(node)) return;

    cols[depth].push(node);

    this.getNodes(node, 'output').map(n =>
      this.getNodesTable(n, cols, depth + 1)
    );
    this.getNodes(node, 'input').map(n =>
      this.getNodesTable(n, cols, depth - 1)
    );

    return cols;
  }

  nodeSize(node) {
    const el = this.editor.view.nodes.get(node).el;

    return {
      width: el.clientWidth,
      height: el.clientHeight
    };
  }

  arrange(node = this.editor.nodes[0]) {
    var completePaths = [...this.editor.nodes];

    console.log('Todos los nodos');
    console.log(completePaths);

    var counter = 0;
    var maximumHeight = 0;
    var heightOffset = 0;
    while (completePaths.length > 0) {
      counter = counter + 1;
      console.log('Camino: ' + counter);
      const table = this.getNodesTable(completePaths[0]);
      // completePaths = completePaths.filter(x => !table[0].includes(x));


      for (let individualTable of table) {
        for (let node of individualTable) {
          var counterNumber = 0;
          for (let nodes of completePaths) {
            if (node == nodes) {
              completePaths.splice(counterNumber, 1);
            }
            counterNumber++;
          }
        }


      }

      console.log('Los nodos que conforman el camino:');
      console.log(table);
      console.log('Los caminos despues de filtrar');
      console.log(completePaths);

      const normalized = Object.keys(table)
        .sort((i1, i2) => +i1 - +i2)
        .map(key => table[key]);
      const widths = normalized.map(col =>
        Math.max(...col.map(n => this.nodeSize(n).width))
      );

      let x = 0;



      for (let [i, col] of Object.entries(normalized)) {
        const heights = col.map(n => this.nodeSize(n).height);
        const fullHeight = heights.reduce((a, b) => a + b + this.margin.y);

        let y = 0;

        x += widths[i] + this.margin.x;
        console.log('Alturas');

        for (let [j, n] of Object.entries(col)) {
          if (j == 0) {
            y += heights[j] + this.margin.y + heightOffset;
          } else {
            y += heights[j] + this.margin.y ;
          }
         
          maximumHeight = Math.max(maximumHeight, y);

          console.log(y);

          // this.editor.view.nodes.get(n).translate(x, y - fullHeight / 2);
          this.editor.view.nodes.get(n).translate(x, y );
          this.editor.view.updateConnections({ node: n });
        }



      }

      console.log('Maxima altura')
      heightOffset = maximumHeight + 50;
      console.log(maximumHeight);
      console.log (heightOffset);
    }

    console.log(this.editor.nodes);

    console.log('Salgo');
  }
}
