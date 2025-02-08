class TreeVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = {
      nodeRadius: 20,
      horizontalSpacing: 300,
      verticalSpacing: 80,
      nodeColors: {
        red: "#ff4444",
        black: "#333333",
        text: "#ffffff",
      },
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(tree) {
    this.clear();
    this._drawSubtree(
      tree.root,
      this.canvas.width / 2,
      50,
      this.config.horizontalSpacing
    );
  }

  _drawSubtree(node, x, y, offset) {
    if (node.value === null) return;

    this._drawNodeConnections(node, x, y, offset);
    this._drawNodeBody(node, x, y);
    this._drawNodeText(node, x, y);

    const newOffset = offset * 0.5;
    this._drawSubtree(
      node.left,
      x - offset,
      y + this.config.verticalSpacing,
      newOffset
    );
    this._drawSubtree(
      node.right,
      x + offset,
      y + this.config.verticalSpacing,
      newOffset
    );
  }

  _drawNodeConnections(node, x, y, offset) {
    this.ctx.strokeStyle = "#888";
    this.ctx.lineWidth = 2;

    if (node.left.value !== null) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + this.config.nodeRadius);
      this.ctx.lineTo(
        x - offset,
        y + this.config.verticalSpacing - this.config.nodeRadius
      );
      this.ctx.stroke();
    }

    if (node.right.value !== null) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + this.config.nodeRadius);
      this.ctx.lineTo(
        x + offset,
        y + this.config.verticalSpacing - this.config.nodeRadius
      );
      this.ctx.stroke();
    }
  }

  _drawNodeBody(node, x, y) {
    this.ctx.fillStyle = node.isRed()
      ? this.config.nodeColors.red
      : this.config.nodeColors.black;

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.config.nodeRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  _drawNodeText(node, x, y) {
    this.ctx.fillStyle = this.config.nodeColors.text;
    this.ctx.font = "14px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(node.value, x, y);
  }
}

export { TreeVisualizer };
