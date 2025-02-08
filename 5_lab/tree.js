const RED = "RED";
const BLACK = "BLACK";

class RBNode {
  constructor(value) {
    this.value = value;
    this.color = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  isRed() {
    return this.color === RED;
  }

  isBlack() {
    return this.color === BLACK;
  }
}

class RBTree {
  constructor() {
    this.NIL = new RBNode(null);
    this.NIL.color = BLACK;
    this.NIL.left = this.NIL;
    this.NIL.right = this.NIL;
    this.root = this.NIL;
  }

  insert(value) {
    const node = new RBNode(value);
    node.left = this.NIL;
    node.right = this.NIL;
    this._insertNode(node);
    if (node !== this.root) {
      this._fixInsert(node);
    }
  }

  _insertNode(node) {
    let parent = null;
    let current = this.root;

    while (current !== this.NIL) {
      parent = current;
      current = node.value < current.value ? current.left : current.right;
    }

    node.parent = parent;

    if (parent === null) {
      this.root = node;
    } else if (node.value < parent.value) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    if (node.parent === null) {
      node.color = BLACK;
      this.root = node;
      return;
    }

    if (node.parent.parent === null) return;
  }

  _fixInsert(node) {
    while (node.parent !== null && node.parent.isRed()) {
      const grandParent = node.parent.parent;
      if (!grandParent) break;

      if (node.parent === grandParent.right) {
        const uncle = grandParent.left;
        if (uncle && uncle.isRed()) {
          this._recolorWithRedUncle(node, uncle, grandParent);
        } else {
          this._handleBlackUncleRight(node, grandParent);
        }
      } else {
        const uncle = grandParent.right;
        if (uncle && uncle.isRed()) {
          this._recolorWithRedUncle(node, uncle, grandParent);
        } else {
          this._handleBlackUncleLeft(node, grandParent);
        }
      }

      if (node === this.root) break;
    }
    this.root.color = BLACK;
  }

  _recolorWithRedUncle(node, uncle, grandParent) {
    uncle.color = BLACK;
    node.parent.color = BLACK;
    grandParent.color = RED;
    node = grandParent;
  }

  _handleBlackUncleRight(node, grandParent) {
    if (!node.parent || !grandParent) return;
    if (node === node.parent.left) {
      node = node.parent;
      this._rightRotate(node);
    }
    node.parent.color = BLACK;
    grandParent.color = RED;
    this._leftRotate(grandParent);
  }

  _handleBlackUncleLeft(node, grandParent) {
    if (node === node.parent.right) {
      node = node.parent;
      this._leftRotate(node);
    }
    node.parent.color = BLACK;
    grandParent.color = RED;
    this._rightRotate(grandParent);
  }

  delete(value) {
    let z = this._findNode(value);
    if (z === this.NIL) return;

    let y = z;
    let yOriginalColor = y.color;
    let x;

    if (z.left === this.NIL) {
      x = z.right;
      this._transplant(z, z.right);
    } else if (z.right === this.NIL) {
      x = z.left;
      this._transplant(z, z.left);
    } else {
      y = this._minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;

      if (y.parent === z) {
        x.parent = y;
      } else {
        this._transplant(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }

      this._transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }

    if (yOriginalColor === BLACK) {
      this._fixDelete(x);
    }
  }

  _fixDelete(x) {
    while (x !== this.root && x.isBlack()) {
      if (x === x.parent.left) {
        this._fixLeftDelete(x);
      } else {
        this._fixRightDelete(x);
      }
    }
    x.color = BLACK;
  }

  _fixLeftDelete(x) {
    let w = x.parent.right;
    if (w.isRed()) {
      w.color = BLACK;
      x.parent.color = RED;
      this._leftRotate(x.parent);
      w = x.parent.right;
    }

    if (w.left.isBlack() && w.right.isBlack()) {
      w.color = RED;
      x = x.parent;
    } else {
      if (w.right.isBlack()) {
        w.left.color = BLACK;
        w.color = RED;
        this._rightRotate(w);
        w = x.parent.right;
      }

      w.color = x.parent.color;
      x.parent.color = BLACK;
      w.right.color = BLACK;
      this._leftRotate(x.parent);
      x = this.root;
    }
  }

  _fixRightDelete(x) {
    let w = x.parent.left;
    if (w.isRed()) {
      w.color = BLACK;
      x.parent.color = RED;
      this._rightRotate(x.parent);
      w = x.parent.left;
    }

    if (w.right.isBlack() && w.left.isBlack()) {
      w.color = RED;
      x = x.parent;
    } else {
      if (w.left.isBlack()) {
        w.right.color = BLACK;
        w.color = RED;
        this._leftRotate(w);
        w = x.parent.left;
      }

      w.color = x.parent.color;
      x.parent.color = BLACK;
      w.left.color = BLACK;
      this._rightRotate(x.parent);
      x = this.root;
    }
  }

  _transplant(u, v) {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  _minimum(node) {
    while (node.left !== this.NIL) {
      node = node.left;
    }
    return node;
  }

  _findNode(value) {
    let node = this.root;
    while (node !== this.NIL) {
      if (value === node.value) return node;
      node = value < node.value ? node.left : node.right;
    }
    return this.NIL;
  }

  _leftRotate(x) {
    const y = x.right;
    x.right = y.left;

    if (y.left !== this.NIL) {
      y.left.parent = x;
    }

    y.parent = x.parent;

    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
  }

  _rightRotate(x) {
    const y = x.left;
    x.left = y.right;

    if (y.right !== this.NIL) {
      y.right.parent = x;
    }

    y.parent = x.parent;

    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }

    y.right = x;
    x.parent = y;
  }
}
export { RBTree };
